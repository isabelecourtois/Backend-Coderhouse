export default class usuario {
    constructor({
      id,
      timestamp,
      email,
      nombre,
      direccion,
      edad,
      telefono,
      foto,
      carritoId,
      hash,
      salt,
    }) {
      this.id = id;
      this.timestamp = timestamp;
      this.email = email;
      this.nombre = nombre;
      this.direccion = direccion;
      this.edad = edad;
      this.telefono = telefono;
      this.foto = foto;
      this.carritoId = carritoId;
      this.hash = hash;
      this.salt = salt;
    }
  }
  
  export function transformarDTO(users) {
    if (Array.isArray(users)) {
      return users.map((user) => new usuario(user));
    } else {
      return new usuario(users);
    }
  }
  