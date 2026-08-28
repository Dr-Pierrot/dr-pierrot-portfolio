import { NextResponse } from "next/server";
import { Resend } from "resend";
import { emailConfig } from "@/lib/env";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 },
      );
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
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
      subject: `[Portfolio] ${subject}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6;">
          <p><strong>From:</strong> ${escapeHtml(name)} (${escapeHtml(email)})</p>
          <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send message." },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json(
      { error: "Something went wrong." },
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
