export default class productoDTO {
    constructor({id, nombre, foto, precio}) {
        this.id = id;
        this.nombre = nombre;
        this.foto = foto;
        this.precio = precio;
    }
}

export function transformarADTO(productos) {
    if(Array.isArray(productos)) {
        return productos.map( p => new productoDTO(p));
    } else {
        return new productoDTO(productos)
    }
}
