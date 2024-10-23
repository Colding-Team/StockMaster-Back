import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { EmailService } from './email.service';
import { Public } from 'src/auth/auth.guard';

@Controller('email')
export class EmailController {
  constructor(private emailService: EmailService) { }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('send')
  async sendEmail(to: string, subject: string, text: string): Promise<void> {
    await this.emailService.sendEmail(to, subject, text)
  }
}
