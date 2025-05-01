import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  async sendResetPasswordEmail(email: string, token: string): Promise<void> {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
    
    await this.transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'بازیابی رمز عبور',
      html: `
        <div dir="rtl">
          <h2>درخواست بازیابی رمز عبور</h2>
          <p>برای تنظیم مجدد رمز عبور، روی لینک زیر کلیک کنید:</p>
          <a href="${resetUrl}">تنظیم مجدد رمز عبور</a>
          <p>این لینک تا ۱ ساعت معتبر است</p>
        </div>
      `,
    });
  }
}