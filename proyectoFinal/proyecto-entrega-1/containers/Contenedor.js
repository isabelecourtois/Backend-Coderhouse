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
            return console.log ("Error en getAll");
        }
    }

     async delete(){
        const deleteFile = await fs.promises.readFile(this.ruta, "utf-8")
        try{
            const deleteFiles = JSON.parse(deleteFile)
            return deleteFiles
        }
        catch(error){
            console.log("Error en delete()" )
        }
    }


    async deleteById(id){
        let readAllFile = await this.delete()
        let readFiles = readAllFile.filter(e => e.id !== id)
        await fs.promises.writeFile(this.ruta, JSON.stringify(readFiles, null, 2))
        try{
            console.log(`Se borró el artículo`)
        }
        catch(error){
            console.log("Error en deleteById()")
        }
    }
     
    async deleteAll() {
        await fs.promises.unlink(this.ruta)
            try {
               
                console.log ("Se borró el archivo")
            }
            catch(error) {
                console.log("Error en deleteAll()")
            }
     }

}

export default Contenedor