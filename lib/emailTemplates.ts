export function trackingEmailTemplate(
  name: string,
  trackingCode: string
) {
  const trackingUrl = `https://www.fedex-logistics.org/track?code=${trackingCode}`;

  return `
  <div style="margin:0;padding:0;background-color:#f2f2f2;font-family:Arial, Helvetica, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
      <tr>
        <td align="center">
          <table width="100%" cellpadding="0" cellspacing="0"
            style="max-width:600px;background:#ffffff;border-top:8px solid #FF6200;box-shadow:0 4px 10px rgba(0,0,0,0.1);">

            <!-- HEADER / LOGO -->
            <tr>
              <td style="padding:30px 40px;background:#4D148C;">
                <table width="100%">
                  <tr>
                    <td>
                      <span style="font-size:32px;font-weight:900;font-style:italic;color:#ffffff;letter-spacing:-2px;text-transform:uppercase;">Fed<span style="color:#FF6200;">ex</span></span>
                    </td>
                    <td align="right" style="color:#ffffff;font-size:10px;font-weight:bold;text-transform:uppercase;letter-spacing:1px;opacity:0.8;">
                      Advanced Tracking
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- BODY -->
            <tr>
              <td style="padding:40px;color:#333333;">
                <h2 style="margin:0 0 20px;font-size:20px;font-weight:900;color:#4D148C;text-transform:uppercase;font-style:italic;">
                  Your shipment is on its way.
                </h2>
                
                <p style="font-size:15px;line-height:1.6;margin:0 0 25px;">
                  Hello <strong>${name}</strong>, <br><br>
                  We have successfully processed your shipment. You can monitor the status of your delivery in real-time using the tracking details provided below.
                </p>

                <!-- TRACKING INFO CARD -->
                <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9f9f9;border:1px solid #e0e0e0;margin-bottom:30px;">
                  <tr>
                    <td style="padding:25px;text-align:center;">
                      <p style="margin:0 0 10px;font-size:11px;font-weight:900;color:#777777;text-transform:uppercase;letter-spacing:2px;">
                        Tracking ID Number
                      </p>
                      <p style="margin:0 0 20px;font-size:28px;font-weight:900;color:#4D148C;letter-spacing:1px;">
                        ${trackingCode}
                      </p>
                      
                      <!-- CTA BUTTON -->
                      <a href="${trackingUrl}"
                        style="
                          display:inline-block;
                          background:#4D148C;
                          color:#ffffff;
                          padding:16px 35px;
                          text-decoration:none;
                          font-size:13px;
                          font-weight:900;
                          text-transform:uppercase;
                          letter-spacing:1px;
                          border-radius:2px;
                        ">
                        Track My Package
                      </a>
                    </td>
                  </tr>
                </table>

                <p style="font-size:13px;color:#666666;line-height:1.5;margin:0;">
                  Thank you for choosing <strong>FedEx Logistics</strong>. For security reasons, do not share your tracking number with unauthorized parties.
                </p>
              </td>
            </tr>

            <!-- FOOTER -->
            <tr>
              <td style="background:#4D148C;padding:30px 40px;font-family:Arial,Helvetica,sans-serif;">
                <table width="100%">
                  <tr>
                    <td style="font-size:11px;color:#ffffff;line-height:1.8;opacity:0.7;">
                      © ${new Date().getFullYear()} FedEx. All rights reserved.<br>
                      This is an automated notification. To ensure delivery to your inbox, add <strong>noreply@fedex-logistics.org</strong> to your address book.
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

          </table>
          
          <!-- SUB-FOOTER -->
          <table width="100%" style="max-width:600px;margin-top:20px;">
            <tr>
              <td align="center" style="font-size:10px;color:#999999;text-transform:uppercase;letter-spacing:1px;">
                Customer Support | Privacy Policy | Terms of Use
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
  `;
}