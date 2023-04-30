import ordenRep from "../repositories/orden.js";
import usuarioRep from "../repositories/usuario.js";
import carroRep from "../repositories/carrito.js";
import { ordenEmail } from "../controllers/messages/sendEmail.js";
import { ordenMess } from "../controllers/messages/ordenMess.js";

const ordenRepo = new ordenRep();
const usuarioRepo = new usuarioRep();
const carroRepo = new carroRep();

export default class ordenSer {
  async postOrden(userId) {
    const user = await usuarioRepo.getById(userId);
    if (!user) return null;
    const cart = await carroRepo.getById(user.carritoId);

    const newOrder = {
      timestamp: Date.now(),
      usuario: user,
      carrito: {...cart}, //SPRED TO COPY
    };

    const postOrden = await ordenRepo.save(newOrder);
    postOrden.carrito.productos = postOrden.carrito.productos.map(prod => prod)

    //EMPTY CART AND UPDATE.
    cart.productos = [];
    await carroRepo.update(cart.id, cart);

    // SEND EMAIL
    if (process.env.SEND_EMAIL_SUPPORT == "true") {
      try {
        const buyedProducts = cart.productos
          .map((producto) => {
            return `${producto.nombre} - ${producto.precio}`;
          })
          .join("<br>");
        const html = `<h1>Nuevo Pedido</h1>
                ${buyedProducts}`;
        await ordenEmail(html, user.nombre, user.email);
      } catch (error) {
        console.log(error);
      }
    }

    //TWILLIO SUPPORT
    if (process.env.TWILIO_SUPPORT == "true") {
      try {
        //SEND WHATSAPP
        const whats = {
          body: "Su pedido ha sido recibido y se encuentra en proceso",
          from: "whatsapp:" + process.env.TWILIO_WHATS,
          to: "whatsapp", // IF TWILLIO ACCOUNT IS PAID WE SHOULD PUT HERE user.telefono
        };
        await ordenMess(whats);

        // SEND SMS
        const sms = {
          body: "Su pedido ha sido recibido y se encuentra en proceso",
          from: process.env.TWILIO_SMS,
          to: "SMS", // IF TWILLIO ACCOUNT IS PAID WE SHOULD PUT HERE user.telefono
        };
      } catch (error) {
        console.log(error);
      }
    }

    return postOrden;
  }
}
