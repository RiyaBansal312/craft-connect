import express from "express";
import nodemailer from "nodemailer";
import crypto from "crypto";
import User from "../../models/User.js";
import auth from "../../middleware/auth.js";

const router = express.Router();

// In-memory storage for email OTPs (for development)
const emailOtpStore = new Map();

// Configure Nodemailer (Gmail example)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail
    pass: process.env.EMAIL_PASSWORD // App Password
  }
});

// Generate 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// ========================
// 1️⃣ SEND EMAIL VERIFICATION OTP
// ========================
router.post("/send-verification-email", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (user.emailVerified) {
      return res.status(400).json({ msg: "Email already verified" });
    }

    const otp = generateOTP();
    const expiryTime = Date.now() + 10 * 60 * 1000; // 10 minutes

    // Store OTP
    emailOtpStore.set(user.email, {
      otp,
      expiryTime,
      attempts: 3
    });

    // Email template
    const mailOptions = {
      from: `"CraftConnect" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "🎨 Verify Your Email - CraftConnect",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                      color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .otp-box { background: white; padding: 20px; text-align: center; 
                       border-radius: 10px; margin: 20px 0; border: 2px dashed #667eea; }
            .otp-code { font-size: 36px; font-weight: bold; color: #667eea; 
                        letter-spacing: 8px; font-family: monospace; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
            .button { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                      color: white; padding: 12px 30px; text-decoration: none; 
                      border-radius: 5px; display: inline-block; margin: 10px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎨 CraftConnect</h1>
              <p>Email Verification</p>
            </div>
            <div class="content">
              <h2>Hello ${user.name}!</h2>
              <p>Thank you for registering with CraftConnect. Please verify your email address to complete your registration.</p>
              
              <div class="otp-box">
                <p style="margin: 0; color: #666;">Your verification code is:</p>
                <div class="otp-code">${otp}</div>
                <p style="margin: 10px 0 0 0; color: #999; font-size: 14px;">
                  Valid for 10 minutes
                </p>
              </div>

              <p>Enter this code in the application to verify your email address.</p>
              
              <p style="color: #666; font-size: 14px;">
                <strong>Security Note:</strong> If you didn't request this verification, 
                please ignore this email.
              </p>
            </div>
            <div class="footer">
              <p>© 2024 CraftConnect. All rights reserved.</p>
              <p>This is an automated email. Please do not reply.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    console.log("\n╔═══════════════════════════════════╗");
    console.log("║   📧 EMAIL OTP SENT              ║");
    console.log("╠═══════════════════════════════════╣");
    console.log(`║ Email: ${user.email}`);
    console.log(`║ OTP:   ${otp}                    `);
    console.log(`║ Valid: 10 minutes                ║`);
    console.log("╚═══════════════════════════════════╝\n");

    res.json({
      success: true,
      msg: "Verification email sent successfully! Check your inbox.",
      email: user.email
      // Real email sent - check inbox/spam folder
    });

  } catch (err) {
    console.error("Email Send Error:", err);
    res.status(500).json({ 
      msg: "Failed to send verification email",
      error: err.message 
    });
  }
});

// ========================
// 2️⃣ VERIFY EMAIL OTP
// ========================
router.post("/verify-email-otp", auth, async (req, res) => {
  const { otp } = req.body;

  if (!otp || otp.length !== 6) {
    return res.status(400).json({ msg: "Invalid OTP format" });
  }

  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (user.emailVerified) {
      return res.status(400).json({ msg: "Email already verified" });
    }

    const storedData = emailOtpStore.get(user.email);

    if (!storedData) {
      return res.status(400).json({ msg: "OTP expired or not found. Please request a new one" });
    }

    // Check expiry
    if (Date.now() > storedData.expiryTime) {
      emailOtpStore.delete(user.email);
      return res.status(400).json({ msg: "OTP expired. Please request a new one" });
    }

    // Check attempts
    if (storedData.attempts <= 0) {
      emailOtpStore.delete(user.email);
      return res.status(400).json({ msg: "Too many failed attempts. Please request a new OTP" });
    }

    // Verify OTP
    if (storedData.otp !== otp) {
      storedData.attempts -= 1;
      emailOtpStore.set(user.email, storedData);
      
      return res.status(400).json({ 
        msg: "Invalid OTP",
        attemptsLeft: storedData.attempts
      });
    }

    // OTP verified - Update user
    user.emailVerified = true;
    user.emailVerifiedAt = new Date();
    
    // If artisan, update status
    if (user.role === 'artisan' && user.artisanInfo) {
      user.artisanInfo.status = 'approved';
    }

    await user.save();

    // Clear OTP
    emailOtpStore.delete(user.email);

    console.log(`\n✅ EMAIL VERIFIED for ${user.email}\n`);

    res.json({
      success: true,
      msg: "Email verified successfully!",
      user: {
        name: user.name,
        email: user.email,
        emailVerified: user.emailVerified,
        role: user.role,
        artisanStatus: user.artisanInfo?.status
      }
    });

  } catch (err) {
    console.error("Verify Email Error:", err);
    res.status(500).json({ 
      msg: "Email verification failed",
      error: err.message 
    });
  }
});

// ========================
// 3️⃣ RESEND EMAIL OTP
// ========================
router.post("/resend-verification-email", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (user.emailVerified) {
      return res.status(400).json({ msg: "Email already verified" });
    }

    // Delete old OTP
    emailOtpStore.delete(user.email);

    // Generate new OTP
    const otp = generateOTP();
    const expiryTime = Date.now() + 10 * 60 * 1000;

    emailOtpStore.set(user.email, {
      otp,
      expiryTime,
      attempts: 3
    });

    // Resend email
    const mailOptions = {
      from: `"CraftConnect" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "🔄 Resend: Verify Your Email - CraftConnect",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                      color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .otp-box { background: white; padding: 20px; text-align: center; 
                       border-radius: 10px; margin: 20px 0; border: 2px dashed #667eea; }
            .otp-code { font-size: 36px; font-weight: bold; color: #667eea; 
                        letter-spacing: 8px; font-family: monospace; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎨 CraftConnect</h1>
              <p>Resend Email Verification</p>
            </div>
            <div class="content">
              <h2>Hello ${user.name}!</h2>
              <p>Here's your new verification code:</p>
              
              <div class="otp-box">
                <p style="margin: 0; color: #666;">Your new verification code:</p>
                <div class="otp-code">${otp}</div>
                <p style="margin: 10px 0 0 0; color: #999; font-size: 14px;">
                  Valid for 10 minutes
                </p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `
    };

    await transporter.sendMail(mailOptions);

    console.log("\n╔═══════════════════════════════════╗");
    console.log("║   🔄 NEW EMAIL OTP SENT          ║");
    console.log("╠═══════════════════════════════════╣");
    console.log(`║ Email: ${user.email}`);
    console.log(`║ OTP:   ${otp}                    `);
    console.log("╚═══════════════════════════════════╝\n");

    res.json({
      success: true,
      msg: "New verification email sent",
      devOTP: process.env.NODE_ENV === 'development' ? otp : undefined
    });

  } catch (err) {
    console.error("Resend Email Error:", err);
    res.status(500).json({ 
      msg: "Failed to resend verification email",
      error: err.message 
    });
  }
});

// ========================
// 4️⃣ CHECK EMAIL VERIFICATION STATUS
// ========================
router.get("/email-status", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json({
      email: user.email,
      emailVerified: user.emailVerified || false,
      emailVerifiedAt: user.emailVerifiedAt || null
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ========================
// 5️⃣ TEST ROUTE
// ========================
router.get("/test", (req, res) => {
  res.json({ 
    msg: "Email Verification API is working",
    hasEmailConfig: !!(process.env.EMAIL_USER && process.env.EMAIL_PASSWORD),
    timestamp: new Date().toISOString()
  });
});

export default router;
