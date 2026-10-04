const User = require("../model/userSchema")
const errorHandler = require("../utils/errorHandler")
const { generateJWT } = require("../utils/generateToken")
const bcrypt = require('bcrypt');

const { sendVerificationEmail } = require("../utils/sendEmail")

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
                    message: "user with this email already exist"
                })
            }
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({ name, email, password: hashPassword, role })

        let token = await generateJWT({
            id: newUser._id,
            email: newUser.email,
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
        let token = await generateJWT({ email: existingUser.email, id: existingUser._id })
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
        const creator = req.user
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

        const creator = req.user
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
module.exports = { createUser, getUser, getUserById, userLogin, deleteUser, updateUser }