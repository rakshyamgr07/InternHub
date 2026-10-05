const roleMiddleware = (requiredRole) => {
    return (req, res, next) => {
        try {
            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    message: "Please login first"
                })
            }

            if (req.user.role !== requiredRole) {
                return res.status(403).json({
                    success: false,
                    message: "You are not authorized to perform this action"
                })
            }

            next()

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Role authorization failed"
            })
        }
    }
}

module.exports = roleMiddleware