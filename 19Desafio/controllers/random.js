import { fork } from "child_process";


export function getRandom (req, res) {
    const cantidad = Number(req.query.cant) || 1000000;
    const calculo = fork("./fork/random.js");
    calculo.on("message", msg => {
        if(msg == "listo") {
          calculo.send({msg: "start", cantidad: cantidad});
        } else {
            res.json(JSON.stringify(msg));
        }
    })   
};

