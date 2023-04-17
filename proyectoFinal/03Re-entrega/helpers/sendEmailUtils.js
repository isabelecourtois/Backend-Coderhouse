import * as dotenv from 'dotenv';
dotenv.config()
import { createTransport } from "nodemailer";

const EMAIL_ACCOUNT = process.env.EMAIL
const EMAIL_PASSWORD = process.env.PASSWORD;

export const transporter = createTransport({
  service: 'gmail',
  port: 587,
  auth: {
      user: EMAIL_ACCOUNT,
      pass: EMAIL_PASSWORD
  }
});

export async function sendEmailRegistration(html){
    const mailOptions = {
        from: "Ecommerce Preentrega",
        to: process.env.EMAIL_ACCOUNT,
        subject: "Nuevo Registro",
        html: html
    }
    try {
        const info = await transporter.sendMail(mailOptions)
     } catch (error) {
        console.log(error)
     }
}

export async function sendEmailOrder(html, userName, userEmail){
  const mailOptions = {
      from: "Ecommerce Preentrega",
      to: process.env.EMAIL_ACCOUNT,
      subject: `Nuevo pedido de ${userName} - ${userEmail}`,
      html: html
  }
  try {
      const info = await transporter.sendMail(mailOptions)
   } catch (error) {
      console.log(error)
   }
}