export default class carroDTO {
    constructor({
        id,
        timestamp,
        productos
    }) {
        this.id = id,
        this.timestamp = timestamp,
        this.productos = productos
    }
}

export function transformarDTO(carts) {
    if(Array.isArray(carts)) {
        return carts.map( cart => new carroDTO(cart));
    } else {
        return new carroDTO(carts)
    }
}