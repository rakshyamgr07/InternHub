const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);

async function sendVerificationEmail(to, token) {
    const { data, error } = await resend.emails.send({
        from: process.env.EMAIL_FROM,
        to,
        subject: "Verify your InternHub Nepal account",
        html: `
            <h2>Welcome to InternHub Nepal!</h2>
            <p>Please verify your email address to activate your account.</p>
            <a href="${process.env.FRONTEND_URL}/verify-email/${token}">
                Verify Email
            </a>
        `,
    });

    if (error) {
        console.error("Verification email error:", error);
        throw new Error(error.message || "Failed to send verification email");
    }

    console.log("Verification email sent:", data?.id);
    return data;
}

async function sendResetPasswordEmail(to, token) {
    const { data, error } = await resend.emails.send({
        from: process.env.EMAIL_FROM,
        to,
        subject: "Reset your InternHub Nepal password",
        html: `
            <h2>Password Reset</h2>
            <p>Click the link below to reset your password.</p>
            <a href="${process.env.FRONTEND_URL}/reset-password/${token}">
                Reset Password
            </a>
        `,
    });

    if (error) {
        console.error("Password reset email error:", error);
        throw new Error(error.message || "Failed to send reset email");
    }

    return data;
}

module.exports = {
    sendVerificationEmail,
    sendResetPasswordEmail,
};
