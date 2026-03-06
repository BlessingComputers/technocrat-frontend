"use server";

import { resend } from "@/services/resend";

interface ContactFormData {
  type: "product" | "inquiry";
  firstName?: string;
  lastName?: string;
  email?: string;
  subject?: string;
  comments?: string;
  prodFirstName?: string;
  prodLastName?: string;
  prodEmail?: string;
  orderNumber?: string;
  prodDetails?: string;
}

export async function submitContactForm(data: ContactFormData) {
  try {
    const { type, ...fields } = data;

    const isProductOrder = type === "product";

    // Route to the appropriate inbox
    // For inquiries: contact@blessingcomputers.com
    // For orders: sales@blessingcomputers.com
    const toEmail = isProductOrder
      ? "devteam@technocratng.com"
      : "devteam@technocratng.com";

    const subject = isProductOrder
      ? `Product Order Request: ${fields.orderNumber}`
      : `New Inquiry: ${fields.subject}`;

    const html = isProductOrder
      ? `
        <h2>New Product Order Request</h2>
        <p><strong>Name:</strong> ${fields.prodFirstName} ${fields.prodLastName || ""}</p>
        <p><strong>Email:</strong> ${fields.prodEmail}</p>
        <p><strong>Product:</strong> ${fields.orderNumber}</p>
        <p><strong>Details:</strong></p>
        <p>${fields.prodDetails}</p>
      `
      : `
        <h2>New Inquiry</h2>
        <p><strong>Name:</strong> ${fields.firstName} ${fields.lastName || ""}</p>
        <p><strong>Email:</strong> ${fields.email}</p>
        <p><strong>Subject:</strong> ${fields.subject}</p>
        <p><strong>Comments:</strong></p>
        <p>${fields.comments}</p>
      `;

    const { error } = await resend.emails.send({
      from: "Blessing Computers <onboarding@resend.dev>", // Note: Replace with verified domain in production if available
      to: toEmail,
      subject: subject,
      html: html,
      replyTo: isProductOrder ? fields.prodEmail : fields.email,
    });

    if (error) {
      console.error("Resend error:", error);
      throw new Error(error.message);
    }

    return {
      success: true,
      message: isProductOrder
        ? "Order request sent successfully!"
        : "Inquiry sent successfully!",
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      message: "Failed to send message. Please try again later.",
    };
  }
}
