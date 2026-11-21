import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Strict Schema Validation with Zod
    const validationResult = contactSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Invalid form data",
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, email, phone, service, budget, message } = validationResult.data;

    // 2. Resend Email Dispatch (if API key is configured)
    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey) {
      try {
        const emailResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Grandeur Net <noreply@grandeurnet.com>",
            to: ["info@grandeurnet.com"],
            reply_to: email,
            subject: `[New Lead] ${name} (${service.toUpperCase()} - ${budget})`,
            html: `
              <h2>New Project Inquiry from Grandeur Net Portfolio</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
              <p><strong>Service:</strong> ${service}</p>
              <p><strong>Budget Tier:</strong> ${budget}</p>
              <p><strong>Project Details:</strong></p>
              <blockquote style="background:#f4f4f4;padding:12px;border-left:4px solid #10b981;">
                ${message.replace(/\n/g, "<br/>")}
              </blockquote>
            `,
          }),
        });

        if (!emailResponse.ok) {
          console.error("Resend API responded with error:", await emailResponse.text());
        }
      } catch (emailErr) {
        console.error("Error triggering Resend email:", emailErr);
      }
    } else {
      console.log("Development Mode: Contact inquiry logged safely:", {
        name,
        email,
        phone,
        service,
        budget,
        timestamp: new Date().toISOString(),
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: "Inquiry received successfully. Our team will get back to you shortly.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact submission:", error);
    return NextResponse.json(
      { error: "Internal server error while processing your inquiry." },
      { status: 500 }
    );
  }
}
