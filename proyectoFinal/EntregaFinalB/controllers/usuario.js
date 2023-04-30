import { usuarioSer } from "../services/usuario.js";

const ser = new usuarioSer();

export default class usuarioCnt {
  async register(req, res) {
    const { email, nombre, direccion, edad, telefono, foto, password } = req.body;
    const newUser = {
      timestamp: Date.now(),
      email,
      nombre,
      direccion,
      edad,
      telefono,
      foto,
      password
    }
    const user = await ser.register(newUser);
    res.json(user)
  }

  async login(req, res) {
    const { email, password } = req.body;
    const token = await ser.login(email, password);
    res.json(token)
  }

  async getUsuario(req, res) {
    res.json(await ser.getUsers())
  }
}