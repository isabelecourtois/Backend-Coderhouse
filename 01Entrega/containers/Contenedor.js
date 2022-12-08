// Llamo librerias

import fs from'fs';
//const express = require ('express');

//const app = express ();

// Clase

class Contenedor {
    constructor (ruta){
        this.ruta = ruta;
        this.productos = [];
    
    }

    //Funciones
    
    saveId(){
        const length = this.productos.length

        if (length === 0){
            return 0
        }else{
             return this.productos.length
        }
      
    }


    async save(producto){  
        const id = this.saveId()
        this.productos.push({
            ...producto, ...{id : id +1}
        })

        try {
            await fs.promises.writeFile(this.ruta, JSON.stringify(this.productos, null, 2));
        }
        catch (error) {
            console.log("Error en save()")      
            
        }
    
    }
    
    async getById(id) {
        const idEncontrado = await this.productos.find((ele) => ele.id === id)
        try {
            console.log(idEncontrado  )
        }
        catch(error) {
            console.log ("Error getById()");
        }
    }


     async getAll() {
        try {
            let data = await fs.promises.readFile(this.ruta, 'utf-8')
            this.productos = JSON.parse(data);
            return this.productos;
        }
        catch (error) {
            return console.log ([]);
        }
    }

    

}

export default Contenedor