export default class mensajeDTO {
    constructor({id, mail, nombre, apellido, edad, alias, avatar, message, dateAndTime}) {
        this.id = id;
        this.mail = mail;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.alias = alias;
        this.avatar = avatar;
        this.message = message;
        this.dateAndTime = dateAndTime;
    }
}

export function transformarADTO(mensajes) {
    if(Array.isArray(mensajes)) {
        return mensajes.map( mensaje => new mensajeDTO(mensaje));
    } else {
        return new mensajeDTO(mensajes)
    }
}