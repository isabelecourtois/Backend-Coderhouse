
import { Router } from "express";
//import { fork } from "child_process"; desactivo el child process para el desafío 14
//import path from 'path'

const random =  Router();

/* random.get("/randoms/:cant?", (req, res) => {
    const cantidad = Number(req.query.cant) || 1000000;
    
    const calculo = fork("./fork/random.js");
    calculo.on("message", msg => {
        if(msg == "listo") {
          calculo.send({msg: "start", cantidad: cantidad});
        } else {
            res.json(JSON.stringify(msg));
        }
    })   
}); */

random.get("/randoms/:cant?", (req, res) => {
    const cantidad = Number(req.query.cant) || 1000000;


    function numrandom(cant) {
        const numeros = [];
        for (let i = 0; i < cant; i++) {
          numeros[i] = Math.floor(Math.random() * 1000) + 1;
        }
        let numvisitas = numeros.reduce((valorAnterior, valorActual) => {
          return (valorAnterior[valorActual] ? ++valorAnterior[valorActual] : (valorAnterior[valorActual] = 1), valorAnterior);
        }, {})
        return numvisitas;
      }
      res.send (numrandom(cantidad));
    })
export default random