export default class mensaje {

    #id
    #mail
    #nombre
    #apellido
    #edad
    #alias
    #avatar
    #message
    #dateAndTime

    constructor({id, mail, nombre, apellido, edad, alias, avatar, message, dateAndTime}) {
        this.#id = id;
        this.#mail = mail;
        this.#nombre = nombre;
        this.#apellido = apellido;
        this.#edad = edad;
        this.#alias = alias;
        this.#avatar = avatar;
        this.#message = message;
        this.#dateAndTime = dateAndTime;

    }

    get id() {
        return this.#id;
    }

    set id(id) {
        this.#id = id;
    }

    get nombre() {
        return this.#nombre;
    }

    set nombre(nombre) {
        this.#nombre = nombre;
    }

    get apellido() {
        return this.#apellido;
    }

    set apellido(apellido) {
        this.#apellido = apellido;
    }

    get edad() {
        return this.#edad;
    }

    set edad(edad) {
        this.#edad = edad;
    }

    get mail() {
        return this.#mail;
    }

    set mail(mail) {
        this.#mail = mail;
    }

    get alias() {
        return this. alias;
    }

    set alias(alias) {
        this.#alias = alias;
    }

    get avatar() {
        return this.#avatar;
    }

    set avatar(avatar) {
        this.#avatar = avatar;
    }

    get message() {
        return this.#message;
    }

    set message(message) {
        this.#message = message;
    }

    get dateAndTime() {
        return this.#dateAndTime;
    }

    set dateAndTime(dateAndTime) {
        this.#dateAndTime = dateAndTime;
    }

    verMensaje() {
        return {id: this.#id, mail: this.#mail, nombre: this.#nombre, apellido: this.#apellido, edad: this.#edad, alias: this.#alias, avatar: this.#avatar, message: this.#message, dateAndTime: this.#dateAndTime};
    }

}