export function emailOtpHtmlTemplate(name: string, otp: number) {
  const htmlContent = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Verification</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f4f7fa;
              margin: 0;
              padding: 0;
          }
          .email-container {
              width: 100%;
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              border-radius: 8px;
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          }
          .email-header {
              background-color: #4CAF50;
              color: white;
              padding: 20px;
              text-align: center;
              border-radius: 8px 8px 0 0;
          }
          .email-content {
              padding: 20px;
              text-align: center;
          }
          .otp-code {
              font-size: 30px;
              font-weight: bold;
              color: #4CAF50;
              margin: 20px 0;
          }
          .email-footer {
              background-color: #f4f7fa;
              padding: 20px;
              text-align: center;
              font-size: 12px;
              color: #777;
              border-radius: 0 0 8px 8px;
          }
          a {
              color: #4CAF50;
              text-decoration: none;
          }
      </style>
  </head>
  <body>
      <div class="email-container">
          <div class="email-header">
              <h2>Email Verification</h2>
          </div>
          <div class="email-content">
              <h3>Hi ${name},</h3>
              <p>Thank you for registering with us! Please use the following One-Time Password (OTP) to verify your email address:</p>
              <div class="otp-code">
                  ${otp}
              </div>
              <p>This OTP is valid for the next 10 minutes. If you didn't request this, you can safely ignore this email.</p>
          </div>
          <div class="email-footer">
              <p>If you have any questions, feel free to contact us at <a href="mailto:support@yourdomain.com">support@yourdomain.com</a></p>
              <p>© {{year}} Your Company Name. All Rights Reserved.</p>
          </div>
      </div>
  </body>
  </html>
  `;

  return htmlContent;
}
