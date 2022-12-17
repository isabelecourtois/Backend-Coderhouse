import fs from "fs";

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
        console.log("Error en save()")      
        
    }

}

async getById(id) {
  const traerAll = this.getAll();
    const idEncontrado = await traerAll
    const prodEncontrado = idEncontrado.find((el) => el.id == id)
    try {
      //console.log(idEncontrado);  
      console.log(prodEncontrado)
        return prodEncontrado;
    }
    catch(error) {
        console.log ("Error getById()");
    }
}

async getAll() {
    try {
      const data = await fs.promises.readFile(this.ruta, "utf-8");
      this.productos = JSON.parse(data);
      return this.productos;
    } catch (err) {
      console.log("error en getAll");
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

async deleteById(id) {

    try {
     const data = await fs.promises.readFile(this.ruta, "utf-8");
     this.productos = JSON.parse(data);
     let objetoBorrado = this.productos.find(objeto => objeto.id === parseInt(id));

 
         if (objetoBorrado === undefined) {
 
             return {error: 'Producto no encontrado'};
             
 
         } else {
 
             let indice = this.productos.indexOf(objetoBorrado);
             this.productos.splice(indice,1);
             fs.writeFileSync(this.ruta, JSON.stringify(this.productos, null, 2));
             return objetoBorrado;
 
         }
     }
     catch (error) {
         return {error: 'No se pudo borrar el objeto con ese ID'};
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

 async update(id, objeto) {

   // let array = this.getAll();

   try {
    const data = await fs.promises.readFile(this.ruta, "utf-8");
    this.productos = JSON.parse(data);
    let objetoActualizado = this.productos.find(objeto => objeto.id === parseInt(id));
   // console.log(objetoActualizado);

        if (objetoActualizado === undefined) {

            return {error: 'Producto no encontrado'};
            

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
        return {error: 'No se pudo actualizar el objeto con ese ID'};
    }
    
}

 /* IdExists(id) {
    let response = false;
    this.productos.forEach((element, index) => {
      if (element.id == id) {
        response = index;
      }
    });
    return response;
  }

  async update(id, newObject) {
    let index = this.IdExists(id);
    if (index) {
      this.productos[index] = { ...newObject, id: Number(id) };
      await fs.promises.writeFile(
        this.ruta,
        JSON.stringify(this.producto)
      );
      console.log("se actualizo");
      return Promise.resolve(id);
    } else {
      console.log("no existe el id");
    }
  } */
}; 

export default Container;
