import ordenSer from "../services/orden.js";


const ser = new ordenSer();

export default class ordenCnt {
    async postOrden(req, res) {
        const { userId } = req.params;
        const order = await ser.postOrden(userId)
        res.json(order);
    }
}