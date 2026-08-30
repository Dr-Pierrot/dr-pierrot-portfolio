import { NextResponse } from "next/server";
import { Resend } from "resend";
import { emailConfig } from "@/lib/env";

// Rate limiting store (in production, use Redis or database)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Rate limiting configuration
const RATE_LIMIT = {
  maxRequests: 3, // Max 3 requests
  windowMs: 15 * 60 * 1000, // Per 15 minutes
  blockDurationMs: 60 * 60 * 1000, // Block for 1 hour after limit exceeded
};

// Honeypot and spam detection
const SPAM_PATTERNS = [
  /(?:cialis|viagra|pharmacy|casino|poker|loan|credit|debt|bitcoin|crypto)/i,
  /(?:click here|visit our site|buy now|act now|limited time)/i,
  /(?:http[s]?:\/\/[^\s]+){3,}/i, // Multiple URLs
  /(?:free money|make money fast|work from home)/i,
];

function getClientIP(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIP = request.headers.get("x-real-ip");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "127.0.0.1";
  }
  if (realIP) {
    return realIP;
  }

  // Fallback for development
  return "127.0.0.1";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const clientData = rateLimitStore.get(ip);

  if (!clientData) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT.windowMs });
    return false;
  }

  // Reset count if window expired
  if (now > clientData.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT.windowMs });
    return false;
  }

  // Check if already blocked
  if (clientData.count > RATE_LIMIT.maxRequests) {
    // Extend block duration if they keep trying
    if (now < clientData.resetTime + RATE_LIMIT.blockDurationMs) {
      return true;
    }
    // Reset after block duration
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT.windowMs });
    return false;
  }

  // Increment count
  clientData.count++;

  return clientData.count > RATE_LIMIT.maxRequests;
}

function detectSpam(content: string): boolean {
  return SPAM_PATTERNS.some((pattern) => pattern.test(content));
}

function validateHoneypot(honeypot: string | undefined): boolean {
  // Honeypot field should be empty (invisible to users, filled by bots)
  return !honeypot || honeypot.trim() === "";
}

function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, "") // Remove potential HTML tags
    .substring(0, 5000); // Limit length
}

export async function POST(req: Request) {
  try {
    const clientIP = getClientIP(req);

    // Rate limiting check
    if (isRateLimited(clientIP)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        {
          status: 429,
          headers: {
            "Retry-After": "3600", // 1 hour
            "X-RateLimit-Limit": RATE_LIMIT.maxRequests.toString(),
            "X-RateLimit-Remaining": "0",
          },
        },
      );
    }

    const body = await req.json();
    const { name, email, subject, message, honeypot, timestamp } = body;

    // Honeypot validation
    if (!validateHoneypot(honeypot)) {
      console.log(`Honeypot triggered from IP: ${clientIP}`);
      // Return success to not reveal honeypot to bots
      return NextResponse.json({ success: true });
    }

    // Timestamp validation (form should take at least 3 seconds to fill)
    const now = Date.now();
    if (timestamp && now - timestamp < 3000) {
      console.log(`Form submitted too quickly from IP: ${clientIP}`);
      return NextResponse.json(
        { error: "Please take your time filling out the form." },
        { status: 400 },
      );
    }

    // Basic validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 },
      );
    }

    // Enhanced email validation
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 },
      );
    }
    // Sanitize inputs
    const sanitizedName = sanitizeInput(name);
    const sanitizedSubject = sanitizeInput(subject);
    const sanitizedMessage = sanitizeInput(message);

    // Spam detection
    const fullContent = `${sanitizedName} ${sanitizedSubject} ${sanitizedMessage}`;
    if (detectSpam(fullContent)) {
      console.log(
        `Spam detected from IP: ${clientIP}, content: ${fullContent.substring(0, 100)}`,
      );
      return NextResponse.json(
        { error: "Message flagged as spam. Please contact us directly." },
        { status: 400 },
      );
    }

    // Additional validation
    if (sanitizedMessage.length < 10) {
      return NextResponse.json(
        { error: "Message too short. Please provide more details." },
        { status: 400 },
      );
    }

    if (!emailConfig.resendApiKey) {
      return NextResponse.json(
        { error: "Email service is not configured yet." },
        { status: 500 },
      );
    }

    const resend = new Resend(emailConfig.resendApiKey);
    const { error } = await resend.emails.send({
      from: `Portfolio Contact <${emailConfig.fromEmail}>`,
      to: emailConfig.toEmail,
      replyTo: email,
      subject: `[Portfolio] ${sanitizedSubject}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; max-width: 600px;">
          <h2 style="color: #0e7c74; border-bottom: 2px solid #e7f4f1; padding-bottom: 8px;">New Contact Form Message</h2>
          
          <div style="background: #f9f9f9; padding: 16px; border-radius: 8px; margin: 16px 0;">
            <p><strong>From:</strong> ${escapeHtml(sanitizedName)}</p>
            <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
            <p><strong>Subject:</strong> ${escapeHtml(sanitizedSubject)}</p>
            <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
            <p><strong>IP Address:</strong> ${clientIP}</p>
          </div>
          
          <div style="background: white; padding: 16px; border-left: 4px solid #0e7c74; margin: 16px 0;">
            <p><strong>Message:</strong></p>
            <div style="white-space: pre-wrap; font-family: Georgia, serif; line-height: 1.6;">
${escapeHtml(sanitizedMessage)}
            </div>
          </div>
          
          <div style="margin-top: 24px; padding: 12px; background: #e7f4f1; border-radius: 6px; font-size: 14px; color: #0b6259;">
            <p><strong>Security Info:</strong></p>
            <p>• Form validation: ✓ Passed</p>
            <p>• Spam detection: ✓ Clean</p>
            <p>• Rate limiting: ✓ Within limits</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send message. Please try again." },
        { status: 502 },
      );
    }

    // Log successful submission for monitoring
    console.log(
      `Contact form submitted successfully from IP: ${clientIP}, email: ${email}`,
    );

    return NextResponse.json({
      success: true,
      message: "Message sent successfully! I'll get back to you soon.",
    });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
