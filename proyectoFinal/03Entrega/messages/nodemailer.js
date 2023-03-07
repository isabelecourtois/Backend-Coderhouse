import { createTransport } from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const EMAIL_ACCOUNT = process.env.EMAIL
const EMAIL_PASSWORD = process.env.PASSWORD;

console.log(EMAIL_ACCOUNT, EMAIL_PASSWORD);

const transporter = createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: EMAIL_ACCOUNT,
        pass: EMAIL_PASSWORD
    }
});

const mailOptions = {
    from: 'NodeJS app <noreply@example.com>',
    to: `"Acces account! 👩‍💻👨‍💻" <${EMAIL_ACCOUNT}>`,
    subject: 'Usuario conectado',
    text: 'Hello Coders!',
    html: '<h1 style="color:aqua">Contenido HTML con <span style="color: green;">Node.js & Nodemailer</span></h1>'
}

try {
    const info = await transporter.sendMail(mailOptions);
    console.log(info)
} catch (error) {
    console.log(error);    
}

export default nodemailer