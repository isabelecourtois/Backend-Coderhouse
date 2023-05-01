import fs from "fs";
import { loggers } from "./loggers/loggers.js";

class Container {

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
        loggers.error("Error en save()")      
        
    }

}

async getById(id) {
  const traerAll = this.getAll();
    const idEncontrado = await traerAll
    const prodEncontrado = idEncontrado.find((el) => el.id == id)
    try {
      //console.log(idEncontrado);  
     // console.log(prodEncontrado)
        return prodEncontrado;
    }
    catch(error) {
        loggers.error ("Error getById()");
    }
}

async getAll() {
    try {
      const data = await fs.promises.readFile(this.ruta, "utf-8");
      this.productos = JSON.parse(data);
      return this.productos;
    } catch (err) {
        loggers.error("error en getAll");
    }
  }

 async delete(){
    const deleteFile = await fs.promises.readFile(this.ruta, "utf-8")
    try{
        const deleteFiles = JSON.parse(deleteFile)
        return deleteFiles
    }
    catch(error){
        loggers.error("No se pudo borrar()" )
    }
}

async deleteById(id) {

    try {
     const data = await fs.promises.readFile(this.ruta, "utf-8");
     this.productos = JSON.parse(data);
     let objetoBorrado = this.productos.find(objeto => objeto.id === parseInt(id));

 
         if (objetoBorrado === undefined) {
             return {error: 'Ups, algo salió mal'};
         } else {
             let indice = this.productos.indexOf(objetoBorrado);
             this.productos.splice(indice,1);
             fs.writeFileSync(this.ruta, JSON.stringify(this.productos, null, 2));
             return objetoBorrado;
 
         }
     }
     catch (error) {
         return {error: 'Ups, algo salió mal'};
     }
     
 }


 
async deleteAll() {
    await fs.promises.unlink(this.ruta)
        try {
           
            loggers.info ("Se borró el archivo")
        }
        catch(error) {
            loggers.error ("Error en deleteAll()")
        }
 }

 async update(id, objeto) {


   try {
    const data = await fs.promises.readFile(this.ruta, "utf-8");
    this.productos = JSON.parse(data);
    let objetoActualizado = this.productos.find(objeto => objeto.id === parseInt(id));
   // console.log(objetoActualizado);

        if (objetoActualizado === undefined) {

            return {error: 'Ups, algo salió mal'};
            

        } else {

            let indice = this.productos.indexOf(objetoActualizado);
            objeto.id = parseInt(id);
            objeto.timestamp = Date.now();
            this.productos[indice] = objeto;
            fs.writeFileSync(this.ruta, JSON.stringify(this.productos, null, 2));
            return objeto;

        }
    }
    catch (error) {
        return {error: 'Ups, algo salió mal'};
    }
    
}
}; 

export default Container;
