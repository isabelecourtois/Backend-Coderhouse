import { cartContainer } from "../routes/carrito.js";
//import { sendMessage } from "./sendMessage.js";
import { orderEmail } from "./sendEmail.js";


 export async function dataOrder(req, res) {
    const usuario = await usuario.findOne({ username: username })
    const cart = await cartContainer.getById(user[0].cartId)
    res.json({
        user: usuario[0],
        cart: cart[0],
    });
} 

export async function sendOrder(req, res) {
    const usuario = await usuario.findOne({ username: username })
    const cart = await cartContainer.getById(user[0].cartId)

    // 1. Email
    const buyedProducts = cart[0].productos.map(producto => {
        return `${producto.nombre} - ${producto.precio}`
    }).join("<br>")
    
    const html = `<h1>Nuevo Pedido</h1>
    ${buyedProducts}`;

    await orderEmail(html, usuario[0].nombre, usuario[0].email );
 
   /*  // 2. Whatsapp
    const whats = {
        body: 'Gracias por tu compra',
        from: "whatsapp:"+process.env.TWILIO_WHATS,
        to: 'whatsapp:+524445872063'
    }

    await sendMessage(whats);
    
    // 3. SMS
    const sms = {
        body: 'Gracias por tu compra',
        from: process.env.TWILIO_SMS,
        to: '+524445872063'
    }
    
    await sendMessage(sms); 
 */
    // RESPONSE
    res.json({
        status: "Órden exitosa"
    })

} 

