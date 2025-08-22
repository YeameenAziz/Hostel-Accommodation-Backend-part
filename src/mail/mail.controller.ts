import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { MailService } from './mail.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send')
  @UseGuards(AuthGuard('jwt'))
  async sendMail(@Body() body: { to: string; subject: string; text: string; html?: string }) {
    const { to, subject, text, html } = body;
    await this.mailService.sendMail(to, subject, text, html);
    return { message: 'Email sent successfully' };
  }
}