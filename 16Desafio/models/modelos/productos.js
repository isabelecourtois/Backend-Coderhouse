export default class producto {

    #id
    #producto
    #precio
    #thumbnail

    constructor({id, producto, precio, thumbnail}) {
        this.#id = id;
        this.#producto = producto;
        this.#precio = precio;
        this.#thumbnail = thumbnail;
    }

    get id() {
        return this.#id;
    }

    set id(id) {
        this.#id = id;
    }

    get producto() {
        return this.#producto;
    }

    set producto(producto) {
        this.#producto = producto;
    }

    get precio() {
        return this.#precio;
    }

    set precio(precio) {
        this.#precio = precio;
    }

    get thumbnail() {
        return this.#thumbnail;
    }

    set thumbnail(thumbnail) {
        this.#thumbnail = thumbnail;
    }

    datosProducto() {
        return {id: this.#id, producto: this.#producto, precio: this.#precio, thumbnail: this.#thumbnail};
    }

    test() {
        console.log("TEST")
    }
}