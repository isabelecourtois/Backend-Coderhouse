export default class Producto {

    #id
    #nombre
    #foto
    #precio

    constructor({id, nombre, foto, precio}) {
        this.#id = id;
        this.#nombre = nombre;
        this.#foto = foto;
        this.#precio = precio;
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

    get foto() {
        return this.#foto;
    }

    set foto(foto) {
        this.#foto = foto;
    }

    get precio() {
        return this.#precio;
    }

    set precio(precio) {
        this.#precio = precio;
    }

    datosProducto() {
        return {id: this.#id, nombre: this.#nombre, foto: this.#foto, precio: this.#precio};
    }

    test() {
        console.log("TEST")
    }
}