import nodemailer from 'nodemailer';

import { IMailAdapter, ISendMailData } from "../IMailAdapter";

let transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "f5350c9780fd8e",
    pass: "0eb4bccb0aa0b9"
  }
});

export class NodemailerMailAdapter implements IMailAdapter {
  public async sendMail({ subject, body }: ISendMailData): Promise<void> {
    await transport.sendMail({
      from: 'Equipe feedget <oi@feedget.com>',
      to: 'Yves de Sá <yves@gmail.com>',
      subject,
      html: body,
    });
  };
}