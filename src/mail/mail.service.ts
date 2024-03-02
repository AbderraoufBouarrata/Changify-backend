import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { MailDto } from './dto/mail.dto';

@Injectable()
export class MailService {
    constructor(private config: ConfigService) {}
    private readonly logger = new Logger(MailService.name);

    async handleMailSend(body: MailDto) {
        //these are the user's
        const { email, message } = body;

        //these are the admin's
        const myEmail = this.config.get('ADMIN_EMAIL');
        const myPassword = this.config.get('ADMIN_PASSWORD');

        try {
            const transporter = nodemailer.createTransport({
                service: 'Gmail',
                secure: false,
                port: 587,
                auth: {
                    user: myEmail,
                    pass: myPassword,
                },
            });

            const mailOptions = {
                from: email,
                to: myEmail,
                subject: `New Message From Changify`,
                text: `from ${email} \n${message} `,
            };

            transporter.sendMail(mailOptions, (err) => {
                if (err) {
                    Logger.error(err);
                    return {
                        status: 'error',
                        message: 'Error sending email' + err,
                    };
                }
            });
            return {
                status: 'success',
                message: 'Email sent successfully',
            };
        } catch (error) {
            Logger.error(error);
            return {
                status: 'error',
                message: 'Error sending email' + error,
            };
        }
    }
}
