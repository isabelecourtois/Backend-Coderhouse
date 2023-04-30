import { createTransport } from 'nodemailer';
import { loggers } from "../../loggers/loggers.js";
import dotenv from 'dotenv';
dotenv.config();

const EMAIL_ACCOUNT = process.env.EMAIL
const EMAIL_PASSWORD = process.env.PASSWORD;

loggers.info(EMAIL_ACCOUNT, EMAIL_PASSWORD);

const transporter = createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: EMAIL_ACCOUNT,
        pass: EMAIL_PASSWORD
    }
});

export async function registerEmail (html){
const mailOptions = {
    from: 'Tu tienda online <noreply@example.com>',
    to: `"Acces account! 👩‍💻👨‍💻" <${EMAIL_ACCOUNT}>`,
    subject: 'Usuario registrado',
    html: html
}

try {
    const info = await transporter.sendMail(mailOptions);
    loggers.info(info)
} catch (error) {
    loggers.error(error);    
}
}

export async function ordenEmail(html, username, Email){
    const mailOptions = {
        from: 'Tu tienda online <noreply@example.com>',
        to: `"Acces account! 👩‍💻👨‍💻" <${EMAIL_ACCOUNT}>`,
        subject: `Nuevo pedido de ${username} - ${Email}`,
        html: html
    }
    try {
        const info = await transporter.sendMail(mailOptions)
     } catch (error) {
        loggers.error(error)
     }
  }