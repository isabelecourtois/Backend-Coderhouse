import usuarioRep from "../repositories/usuario.js";
import carroRep from "../repositories/carrito.js";
import { registerEmail } from "../controllers/messages/sendEmail.js";
import { loggers } from "../loggers/loggers.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

const usuarioRepo = new usuarioRep();
const carroRepo = new carroRep();

function cryptoPassword(password, hash, salt) {
  const newHash = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");
  return newHash === hash;
}

function crearCryptoPassword(password) {
  const salt = crypto.randomBytes(32).toString('hex');
  const genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");
  return {
      salt: salt,
      hash: genHash
  };
}


export class usuarioSer {
  async register(userData) {
    try {
      const user = await usuarioRepo.getByEmail(userData.email);
      if (user) {
        return { status: "El usuario ya existe" };
      }
      const { salt, hash } = crearCryptoPassword(userData.password);

      const newCart = { timestamp: Date.now(), productos: [] };
      const userCartId = (await carroRepo.save(newCart)).id.toString();

      const newUser = {
        timestamp: Date.now(),
        email: userData.email,
        nombre: userData.nombre,
        direccion: userData.direccion,
        edad: userData.edad,
        telefono: userData.telefono,
        foto: userData.foto,
        carritoId: userCartId,
        hash: hash,
        salt: salt,
      };

      process.env.SEND_EMAIL_SUPPORT == "true"
        ? registerEmail(`<h1>Nuevo registro</h1>
      <p>Datos<br>Nombre: ${userData.nombre}
      <br>Email: ${userData.email}
      </p>`)
        : null;

      return await usuarioRepo.save(newUser);
    } catch (error) {
      loggers.error(error);
    }
  }

  async login(email, password) {
    try {
      const user = await usuarioRepo.getByEmail(email);
      if (!user) {
        return { status: "Usuario existente" };
      } else if (cryptoPassword(password, user.hash, user.salt)) {
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_TOKEN_DURATION,
        });
        return { token: token, id_usr: user.id };
      } else {
        return { status: "Password incorrecto" };
      }
    } catch (error) {
      loggers.error(error);
    }
  }

  async getUsers() {
    return await usuarioRepo.getAll();
  }
}

export function isAuthenticated(req, res, next) {
  const token = req.headers.authorization;
  if(token) {
      jwt.verify(token, process.env.JWT_SECRET, (error) => {
          if(error) return res.json({status: "Error de autenticación"})
          next()
      })
  } else {
      res.json({status: "Error de logeo"})
  }
}

