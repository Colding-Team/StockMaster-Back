import { Injectable } from '@nestjs/common';
import { createTransport } from "nodemailer";
import { config } from "dotenv"

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    config()
    this.transporter = createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PWD,
      },
    });
  }

  async sendEmail(to: string, subject: string, text: string): Promise<void> {
    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to,
      subject,
      text,
      html: `<b>${text}</b>`,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Email enviado com sucesso');
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Não foi possível enviar o email');
    }
  }
}
