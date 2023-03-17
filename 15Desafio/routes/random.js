import { Router } from "express";
import { fork } from "child_process";
import path from 'path'

const random =  Router();

random.get("/randoms/:cant?", (req, res) => {
    const cantidad = Number(req.query.cant) || 1000000;
    const calculo = fork("./fork/random.js");
    calculo.on("message", msg => {
        if(msg == "listo") {
          calculo.send({msg: "start", cantidad: cantidad});
        } else {
            res.json(JSON.stringify(msg));
        }
    })   
});

export default random