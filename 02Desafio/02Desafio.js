//Llamar a FS

const { promises: fs } = require('fs')

// Clase
class Contenedor {

    constructor(ruta) {
        this.ruta = ruta
    }

    //Funciones

    //getAll
    async getAll() {
        try {
            let data = await fs.readFile('./products.txt', 'utf-8')
            return console.log(data);
        }
        catch (error) {
            return console.log ([]);
        }
    }

    //Save
    async save(producto) {
        let data = this.getAll()
        let id = 0
        let dataObj = null

        if (data.length == 0) {
            id = 1
        } else {
            dataObj = JSON.parse(data)
            id = dataObj[dataObj.length = -1].id + 1
        }
        const newObj = { id: id, ...producto }


        fs.writeFile('./products.txt', JSON.stringyfy(newObj, null, 2))
            .then(() => {
                return console.log("nuevo producto");
            })
            .catch(error => {
                return console.log("error al escribir archivo");
            })
    }

    //getById
    async getById(id) {
        const tomarId = await this.getAll.find((element) => element.id === id)
        try {
            console.log(tomarId);
        }
        catch (error) {
            console.log("Error al leer ID");
        }
    } 

    //deleteByID

    async deleteById(id){
        let borrarId = await this.getAll.filter(ele => ele.id !== id)
        await fs.promises.writeFile('./products.txt', JSON.stringify(borrarId, null, 2))
        try{
            console.log("Elemento borrado");
        }
        catch(error){
            console.log("Error al borrar");
        }
    }
     
    async deleteAll() {
        await fs.unlink("./products.txt")
            try {
               
                console.log ("No hay archivo")
            }
            catch(error) {
                console.log("No se pudo borrar")
            }
     }



}

//Ejecuto mis funciones

const contenedor1 = new Contenedor('./products.txt');
contenedor1.getAll();
contenedor1.save({producto:"camisa", precio:"100"});
contenedor1.getByID (1);
