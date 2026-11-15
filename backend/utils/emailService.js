import nodemailer from 'nodemailer';

/**
 * Creates SMTP transport based on environment variables
 */
const getTransporter = () => {
  // If dedicated SMTP credentials are provided
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  // Gmail fallback if GMAIL_USER and GMAIL_PASS provided
  if (process.env.GMAIL_USER && process.env.GMAIL_PASS) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });
  }

  return null;
};

/**
 * Section 3.2 Automated Email Workflow System
 * 1. Admin Notification: The agency team receives an instant email containing all form details.
 *    Subject line format: "New Lead Alert: [Service Required] - [Client Name]"
 * 2. Client Welcome Mail: Automated, branded HTML email thanking the client and confirming next steps.
 */
export const sendLeadEmails = async (lead) => {
  const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER || 'hello@tezscale.com';
  const transporter = getTransporter();

  const adminSubject = `New Lead Alert: [${lead.serviceRequired || 'Digital Growth'}] - [${lead.name}]`;

  const adminHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background: #f8fafc; margin: 0; padding: 24px; color: #0f172a; }
        .card { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
        .header { background: #00A3E0; color: #ffffff; padding: 20px 24px; }
        .header h2 { margin: 0; font-size: 20px; font-weight: 800; }
        .header p { margin: 4px 0 0 0; font-size: 13px; opacity: 0.9; }
        .content { padding: 24px; }
        .field { margin-bottom: 16px; }
        .label { font-size: 11px; text-transform: uppercase; color: #64748b; font-weight: 700; margin-bottom: 4px; }
        .val { font-size: 14px; color: #0f172a; font-weight: 600; }
        .message-box { background: #f1f5f9; padding: 12px 16px; border-radius: 8px; font-size: 13px; line-height: 1.5; color: #334155; }
        .footer { padding: 16px 24px; background: #f8fafc; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b; text-align: center; }
        .btn-wa { display: inline-block; background: #25D366; color: #ffffff; text-decoration: none; padding: 10px 18px; border-radius: 6px; font-size: 13px; font-weight: 700; margin-top: 12px; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <h2>New Inbound Lead Received</h2>
          <p>TezScale Digital Growth Engine • Instant Notification</p>
        </div>
        <div class="content">
          <div class="field">
            <div class="label">Client Name</div>
            <div class="val">${lead.name}</div>
          </div>
          <div class="field">
            <div class="label">Phone / WhatsApp</div>
            <div class="val">${lead.whatsapp}</div>
            <a href="https://wa.me/${lead.whatsapp.replace(/[^0-9]/g, '')}" class="btn-wa" target="_blank">Chat with Client on WhatsApp</a>
          </div>
          <div class="field">
            <div class="label">Business Email</div>
            <div class="val">${lead.email}</div>
          </div>
          <div class="field">
            <div class="label">Target Industry / Business Type</div>
            <div class="val">${lead.businessType || 'General'}</div>
          </div>
          <div class="field">
            <div class="label">Service Required</div>
            <div class="val">${lead.serviceRequired}</div>
          </div>
          ${lead.website ? `
          <div class="field">
            <div class="label">Company / Website</div>
            <div class="val">${lead.website}</div>
          </div>` : ''}
          ${lead.message ? `
          <div class="field">
            <div class="label">Project Brief / Objectives</div>
            <div class="message-box">${lead.message}</div>
          </div>` : ''}
        </div>
        <div class="footer">
          TezScale Lead Capture System • Section 3.2 Spec Compliant
        </div>
      </div>
    </body>
    </html>
  `;

  const clientSubject = `Thank you for contacting TezScale - Your Digital Growth Partner`;

  const clientHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background: #f8fafc; margin: 0; padding: 24px; color: #0f172a; }
        .card { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
        .header { background: #00A3E0; color: #ffffff; padding: 24px; text-align: center; }
        .header h1 { margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px; }
        .header p { margin: 6px 0 0 0; font-size: 13px; opacity: 0.95; }
        .content { padding: 32px 24px; font-size: 14px; line-height: 1.6; color: #334155; }
        .highlight { background: #e0f4ff; border-left: 4px solid #00A3E0; padding: 12px 16px; border-radius: 4px; margin: 20px 0; font-weight: 500; color: #0369a1; }
        .steps { margin: 24px 0; padding: 0; list-style: none; }
        .steps li { margin-bottom: 12px; padding-left: 24px; position: relative; font-weight: 500; }
        .steps li::before { content: "✓"; position: absolute; left: 0; color: #00A3E0; font-weight: 900; }
        .footer { padding: 20px 24px; background: #f8fafc; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b; text-align: center; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <h1>TEZSCALE</h1>
          <p>We are actively providing services to digitally grow your business with us.</p>
        </div>
        <div class="content">
          <p>Dear <strong>${lead.name}</strong>,</p>
          <p>Thank you for submitting your growth inquiry with <strong>TezScale</strong>! We have successfully received your request for <strong>${lead.serviceRequired}</strong>.</p>
          
          <div class="highlight">
            ⚡ <strong>Next Steps:</strong> Our growth specialist will contact you within <strong>24 hours on WhatsApp</strong> (${lead.whatsapp}) to review your goals and share a custom strategy brief.
          </div>

          <p><strong>What to expect during our consultation:</strong></p>
          <ul class="steps">
            <li>In-depth audit of your current digital footprint and competitors</li>
            <li>Customized roadmap tailored for your business (${lead.businessType || 'General'})</li>
            <li>Transparent timeline, ROI forecast, and actionable execution plan</li>
          </ul>

          <p>If you have any urgent queries, feel free to reply directly to this email or connect on WhatsApp at <a href="https://wa.me/919876543210" style="color: #00A3E0; font-weight: bold;">+91 98765 43210</a>.</p>

          <p style="margin-top: 24px;">To your digital growth,<br><strong>Team TezScale</strong></p>
        </div>
        <div class="footer">
          TezScale Digital Growth Agency • Indore, MP, India • <a href="https://tezscale.com" style="color: #64748b;">tezscale.com</a>
        </div>
      </div>
    </body>
    </html>
  `;

  // If live transporter exists, send real emails
  if (transporter) {
    try {
      await Promise.all([
        // Send Admin Notification
        transporter.sendMail({
          from: `"TezScale Leads" <${process.env.SMTP_USER || adminEmail}>`,
          to: adminEmail,
          subject: adminSubject,
          html: adminHtml,
        }),
        // Send Client Welcome Mail
        transporter.sendMail({
          from: `"TezScale Growth Team" <${process.env.SMTP_USER || adminEmail}>`,
          to: lead.email,
          subject: clientSubject,
          html: clientHtml,
        }),
      ]);
      console.log(`✅ [SMTP Delivered] Instant emails dispatched for lead: ${lead.name}`);
    } catch (err) {
      console.warn('⚠️ [SMTP Warning] Could not dispatch emails via SMTP server:', err.message);
    }
  } else {
    // Graceful log simulation when SMTP credentials are not yet populated in .env
    console.log(`📧 [Admin Notification Simulated] Subject: "${adminSubject}" -> Target: ${adminEmail}`);
    console.log(`📩 [Client Welcome Mail Simulated] Subject: "${clientSubject}" -> Target: ${lead.email}`);
  }
};
