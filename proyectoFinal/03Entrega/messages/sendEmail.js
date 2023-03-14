import { createTransport } from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const EMAIL_ACCOUNT = process.env.EMAIL
const EMAIL_PASSWORD = process.env.PASSWORD;

console.log(EMAIL_ACCOUNT, EMAIL_PASSWORD);

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
    console.log(info)
} catch (error) {
    console.log(error);    
}
}

export async function orderEmail(html, username, Email){
    const mailOptions = {
        from: 'Tu tienda online <noreply@example.com>',
        to: `"Acces account! 👩‍💻👨‍💻" <${EMAIL_ACCOUNT}>`,
        subject: `Nuevo pedido de ${username} - ${Email}`,
        html: html
    }
    try {
        const info = await transporter.sendMail(mailOptions)
     } catch (error) {
        console.log(error)
     }
  }