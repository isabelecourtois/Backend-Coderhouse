//Llamar a FS

const { promises: fs } = require('fs')

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
            await fs.writeFile(this.ruta, JSON.stringify(this.productos, null, 2));
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
            let data = await fs.readFile(this.ruta, 'utf-8')
            return console.log(data);
        }
        catch (error) {
            return console.log ([]);
        }
    }
/* 
    async delete(){
        const deleteFile = await fs.readFile(this.ruta, "utf-8")
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
        await fs.writeFile(this.ruta, JSON.stringify(readFiles, null, 2))
        try{
            console.log(`Se borró el artículo`)
        }
        catch(error){
            console.log("Error en deleteById()")
        }
    }
     
    async deleteAll() {
        await fs.unlink(this.ruta)
            try {
               
                console.log ("Se borró el archivo")
            }
            catch(error) {
                console.log("Error en deleteAll()")
            }
     } */

}
const contenedor1 = new Contenedor ("./productos.txt")



contenedor1.save({"title" : "camisa", "price" : 150, "thumbnail" :"www.camisa.com"})
contenedor1.save({"title" : "gorra", "price" : 80, "thumbnail" :"www.gorra.com"})
contenedor1.save({"title" : "chaleco", "price" : 450, "thumbnail" :"www.chaleco.com"})
contenedor1.save({"title" : "zapatos", "price" : 900, "thumbnail" :"www.zapatos.com"}) 
 

 /* contenedor1.save({"title" : "camisa", "price" : 150, "thumbnail" :"www.camisa.com"}, 
 {"title" : "gorra", "price" : 80, "thumbnail" :"www.gorra.com"}, 
 {"title" : "chaleco", "price" : 450, "thumbnail" :"www.chaleco.com"}, 
 {"title" : "zapatos", "price" : 900, "thumbnail" :"www.zapatos.com"});  */ 


 //console.log(contenedor1);

 //console.log(contenedor1.getById(2));

 const num = parseInt(Math.random()*4)+1;
 console.log(num);
 const prodRandom = contenedor1.getById(num);
 console.log(prodRandom);
 //console.log(contenedor1.getAll());
 //console.log(contenedor1.deleteById(3))
 //contenedor1.deleteAll();

 