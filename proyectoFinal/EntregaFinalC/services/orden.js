import ordenRep from "../repositories/orden.js";
import usuarioRep from "../repositories/usuario.js";
import carroRep from "../repositories/carrito.js";
import { ordenEmail } from "../controllers/messages/sendEmail.js";
import { ordenMess } from "../controllers/messages/ordenMess.js";
import { loggers } from "../loggers/loggers.js";


const ordenRepo = new ordenRep();
const usuarioRepo = new usuarioRep();
const carroRepo = new carroRep();

export default class ordenSer {
  async postOrden(id_usr) {
    const user = await usuarioRepo.getById(id_usr);
    if (!user) return null;
    const cart = await carroRepo.getById(user.carritoId);

    const newOrder = {
      timestamp: Date.now(),
      usuario: user,
      carrito: {...cart}, 
    };

    const postOrden = await ordenRepo.save(newOrder);
    postOrden.carrito.productos = postOrden.carrito.productos.map(prod => prod)

    cart.productos = [];
    await carroRepo.update(cart.id, cart);

  //Empieza el envío de mensajes
    if (process.env.SEND_EMAIL_SUPPORT == "true") {
      try {
        const buyedProducts = cart.productos
          .map((producto) => {
            return `${producto.nombre} - ${producto.precio}`;
          })
          .join("<br>");
        const html = `<h1>¡Haz reecibido un nuevo pedido!</h1>
                ${buyedProducts}`;
        await ordenEmail(html, user.nombre, user.email);
      } catch (error) {
        loggers.error(error);
      }
    }


    if (process.env.TWILIO_SUPPORT == "true") {
      try {
        const whats = {
          body: "Pedido realizado",
          from: "whatsapp:" + process.env.TWILIO_WHATS,
          to: "whatsapp", 
        };
        await ordenMess(whats);

        const sms = {
          body: "Pedido realizado",
          from: process.env.TWILIO_SMS,
          to: "SMS", 
        };
      } catch (error) {
        loggers.error(error);
      }
    }

    return postOrden;
  }
}
