import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: 587, 
      secure: false, 
      auth: {
        user: 'kmyeaserarafat1971@gmail.com', // Your Gmail address
        pass: '', // App Password, not your Gmail account password
      },
      debug: true, 
      logger: true, 
    });
  }

  async sendMail(to: string, subject: string, text: string, html?: string): Promise<void> {
    const mailOptions = {
      from: 'kmyeaserarafat1971@gmail.com', // Sender email address
      to,
      subject,
      text,
      html,
    };

    await this.transporter.sendMail(mailOptions);
  }
}