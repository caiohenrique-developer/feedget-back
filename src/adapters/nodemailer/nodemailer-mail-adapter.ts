import nodemailer from "nodemailer";
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "58f6add4bbccdf",
    pass: "479e01aff07f7f",
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: "Equipe FeedGet <oi@feedget.com>",
      to: "Caio Henrique <caiohenrique.developer@gmail.com>",
      subject,
      html: body,
    });
  }
}
