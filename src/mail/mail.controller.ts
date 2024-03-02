import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailDto } from './dto/mail.dto';

@Controller('contact')
export class MailController {
    constructor(private readonly mailService: MailService) {}

    @Post('')
    sendMail(@Body() body: MailDto) {
        return this.mailService.handleMailSend(body);
    }
}
