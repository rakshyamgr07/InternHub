const User = require("../model/userSchema")
const errorHandler = require("../utils/errorHandler")
const { generateJWT, verifyJWT } = require("../utils/generateToken")
const bcrypt = require('bcrypt');

const { sendVerificationEmail } = require("../utils/sendEmail");
const Internship = require("../model/internshipSchema");
const Company = require("../model/companySchema");
const Application = require("../model/applicationSchema");

async function createUser(req, res) {
    try {
        const { name, email, password, role } = req.body
        if (!name || !email || !password || !role) {
            return res.status(400).json({
                success: false,
                message: "please insert all the fields"
            })
        }
        const existingUser = await User.findOne({ email })

        if (existingUser) {
            if (existingUser.verify) {
                return res.status(400).json({
                    success: false,
                    message: "User with this email already exists"
                })
            }

            return res.status(400).json({
                success: false,
                message: "Please verify your email before registering again"
            })
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({ name, email, password: hashPassword, role })

        const token = await generateJWT({
            id: newUser._id,
            email: newUser.email,
            role: newUser.role
        })
        await sendVerificationEmail(newUser.email, token)

        return res.status(200).json({
            success: true,
            message: "please check your email to verify the mail",
            user: newUser
        })
    } catch (error) {
        return errorHandler(res, error)
    }
}

async function getUser(req, res) {
    try {
        const users = await User.find()
        return res.status(200).json({
            success: true,
            message: "User fetch successfully",
            users
        });
    } catch (error) {
        return handleError(res, error)
    }
}

async function getUserById(req, res) {
    try {
        const id = req.params.id
        console.log(id)
        const creator = req.body
        console.log(creator)
        const user = await User.findById(id)
        return res.status(200).json({
            success: true,
            message: "User fetched",
            users: user
        })
    } catch (error) {
        return errorHandler(res, error)
    }

}

async function userLogin(req, res) {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(200).json({
                success: true,
                message: "please insert all fields"
            })
        }

        const existingUser = await User.findOne({ email })
        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: "User not registered"
            })
        }
        let token = await generateJWT({ email: existingUser.email, id: existingUser._id, role: existingUser.role })
        if (!existingUser.verify) {
            await sendVerificationEmail(existingUser.email, token)
            return res.status(200).json({
                success: true,
                message: "please check your email to verify the mail",
            })
        }
        const hashPassword = await bcrypt.compare(password, existingUser.password)
        if (!hashPassword) {
            return res.status(200).json({
                success: false,
                message: "user not available"
            })
        }
        return res.status(200).json({
            success: true,
            message: "User login successfully",
            users: {
                id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email,
                role: existingUser.role,
                token
            }
        })
    } catch (error) {
        return errorHandler(res, error)
    }
}

async function deleteUser(req, res) {
    try {
        const id = req.params.id
        console.log(id)
        const creator = req.user.id
        console.log(creator)
        const user = await User.findById(id)
        if (!user) {
            return res.status(404).json({
                success: "false",
                message: "User not found"
            })
        }
        if (creator !== user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "you can only delete your own account"
            })
        }
        if (user.role === "admin") {
            return res.status(403).json({
                success: false,
                message: "Admin cannot be deleted"
            })
        }
        if (user.role === "company") {

            // Find company created by this user
            const company = await Company.findOne({
                creator: user._id
            })

            if (company) {

                // Find all internships of this company
                const internships = await Internship.find({
                    company: company._id
                })

                // Get internship IDs
                const internshipIds = internships.map(
                    internship => internship._id
                )

                // Delete applications related to those internships
                if (internshipIds.length > 0) {
                    await Application.deleteMany({
                        internship: { $in: internshipIds }
                    })
                }

                // Delete internships
                await Internship.deleteMany({
                    company: company._id
                })

                // Delete company
                await Company.findByIdAndDelete(company._id)
            }
        }
        await User.deleteOne({ _id: id })
        return res.status(200).json({
            success: true,
            message: "user deleted successfully"
        })
    } catch (error) {
        return errorHandler(res, error)
    }
}

async function updateUser(req, res) {
    try {
        const id = req.params.id
        console.log(id)
        const { name, email, password, role } = req.body

        const creator = req.user.id
        console.log(creator)
        const user = await User.findById(id)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user not found",
            })
        }
        if (creator !== user._id.toString()) { //user._id object ma hunxw so it is needed to be converted to the string
            return res.status(403).json({
                success: false,
                message: "you can only update your own account"
            })
        }
        let hashPassword = user.password
        if (password) {
            hashPassword = await bcrypt.hash(password, 10)
        }
        await User.updateOne({ _id: id }, { name, email, password: hashPassword, role }, { new: true })
        const updateUser = await User.findById(id)
        return res.status(200).json({
            success: true,
            message: "user updated successfully",
            users: updateUser
        })

    } catch (error) {
        return errorHandler(res, error)
    }
}

async function forgotPassword(req, res) {
    try {
        const { email } = req.body
        if (!email) {
            return res.status(404).json({
                success: false,
                message: "Email is required"
            })
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user not found"
            })
        }

        let token = await generateJWT({ email: user.email, id: user._id, role: user.role })

        await sendResetPasswordEmail(user.email, token)
        return res.status(200).json({
            success: true,
            message: "Password reset link sent to your email",
        })

    } catch (error) {
        return errorHandler(res, error)
    }
}

async function resetPassword(req, res) {
    try {
        const { resetToken } = req.params
        const { newPassword } = req.body
        if (!newPassword) {
            return res.status(404).json({
                success: false,
                message: "Password is required"
            })
        }
        const token = await verifyJWT(resetToken)
        if (!token) {
            return res.status(400).json({
                success: false,
                message: "invalid token/email expired",
            })
        }

        const { id } = token
        const user = await User.findById(id)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user not found"
            })
        }

        const hashPassword = await bcrypt.hash(newPassword, 10)
        await User.updateOne({ _id: id }, { password: hashPassword })
        return res.status(200).json({
            success: true,
            message: "password reset successfully",
        })
    } catch (error) {
        return errorHandler(res, error)
    }
}


async function verifyToken(req, res) {
    try {
        const { verificationToken } = req.params
        console.log(verificationToken)
        const token = await verifyJWT(verificationToken)
        console.log(token)
        if (!token) {
            return res.status(400).json({
                success: false,
                message: "invalid token/email expired",
            })
        }

        const { id } = token
        const user = await User.findById(id)
        console.log(user)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user not found"
            })
        }
        await User.updateOne({ _id: id }, { verify: true })
        return res.status(200).json({
            success: true,
            message: "email verified successfully",
        })

    } catch (error) {
        return errorHandler(res, error)
    }
}
module.exports = { createUser, getUser, getUserById, userLogin, deleteUser, updateUser, forgotPassword, resetPassword ,verifyToken}