export default class orden {
    constructor({
        id,
        timestamp,
        usuario,
        carrito
    }) {
        this.id = id,
        this.timestamp = timestamp,
        this.usuario = usuario,
        this.carrito = carrito
    }
}

export function transformarDTO(orders) {
    if(Array.isArray(orders)) {
        return orders.map( order => new orden(order));
    } else {
        return new orden(orders)
    }
}