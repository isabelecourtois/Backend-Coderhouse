// Llamo librerias

const { promises: fs } = require('fs');
const express = require ('express');

const app = express ();

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

    

}
const contenedor1 = new Contenedor ("./productos.txt")



contenedor1.save({"title" : "camisa", "price" : 150, "thumbnail" :"www.camisa.com"})
contenedor1.save({"title" : "gorra", "price" : 80, "thumbnail" :"www.gorra.com"})
contenedor1.save({"title" : "chaleco", "price" : 450, "thumbnail" :"www.chaleco.com"})
contenedor1.save({"title" : "zapatos", "price" : 900, "thumbnail" :"www.zapatos.com"})


// Llamar al servidor

app.get ('/', (req, res) => {
    res.send ('Desafio03')

});

app.get ('/productos', async (req, res)=>{
    const todosProductos = await contenedor1.getAll();
    res.send (todosProductos);


});

app.get ('/productosrandom', async (req, res)=>{
    const num = parseInt(Math.random()*4)+1;
    const prodRandom = await contenedor1.getById(num);
    res.send (prodRandom);
})

const server = app.listen (8080,()=>{
    console.log('Servidor escuchando en el 8080');
})

server.on ('error', error=>console.log('Error en el servidor'+error));