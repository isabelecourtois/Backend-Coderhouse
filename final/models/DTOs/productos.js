export default class productoDTO {
    constructor({id, producto, precio, thumbnail}) {
        this.id = id;
        this.producto = producto;
        this.precio = precio;
        this.thumbnail = thumbnail;
    }
}

export function transformarADTO(productos) {
    if(Array.isArray(productos)) {
        return productos.map( p => new productoDTO(p));
    } else {
        return new productoDTO(productos)
    }
}
