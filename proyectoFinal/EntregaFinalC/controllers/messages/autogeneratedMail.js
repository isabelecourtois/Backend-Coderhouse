import nodemailer from 'nodemailer';
import { loggers } from "./loggers/loggers.js";

nodemailer.createTestAccount((err, account) => {
    if (err) {
        console.error('Ups, algo salió mal. ' + err.message);
        return process.exit(1);
    }

    loggers.info('Mensaje enviado');

    let transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
            user: account.user,
            pass: account.pass
        }
    });

    loggers.info(account);

    let message = {
        from: 'Sender Name <hola@gmail.com>',
        to: 'Recipient <hello@gmail.com>',
        subject: 'Nodemailer is unicode friendly ✔',
        text: 'Hello to myself! only in txt',
        html: '<p><b>Hello</b> hello</p>'
    };

    transporter.sendMail(message, (err, info) => {
        if (err) {
            loggers.error('Ups, algo salió mal ' + err.message);
            return process.exit(1);
        }

        loggers.info('Message sent: %s', info.messageId);
        loggers.info('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
});