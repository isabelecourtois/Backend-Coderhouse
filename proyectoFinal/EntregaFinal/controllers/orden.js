import ordenSer from "../services/orden.js";


const ser = new ordenSer();

export default class ordenCnt {
    async postOrden(req, res) {
        const { id_usr } = req.params;
        const order = await ser.postOrden(id_usr)
        res.json(order);
    }
}