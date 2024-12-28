import { emailOtpHtmlTemplate } from "@/utils/mail-template";

const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function sendMail(msg: MailBody) {
  sgMail
    .send(msg)
    .then(() => {
      // console.log("Email sent");
    })
    .catch((error: any) => {
      console.error(error.response.body);
    });
}

type MailBody = {
  to: string;
  from: string;
  subject: string;
  text?: string;
  html?: string;
};

export function mailBody({ to, from, subject, text, html }: MailBody) {
  const msg = {
    to: to,
    from: from,
    subject: subject,
    text: text,
    html: html,
  };

  return msg;
}
