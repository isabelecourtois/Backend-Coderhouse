import ProductosRepo from '../models/repository/productos.js'


const productos = new ProductosRepo()

export default class productosServices {
    constructor() {
        
    }

    async getProducts () { 
        return await productos.getAll()
    }
    
    async postProduct ( {datos} ) { 
        let obj = {...datos}
        return await productos.save( obj )
    }
    
    async updateProduct ( {datos} ) { 
        let obj = {...datos}
        return await productos.update( obj )
    }
    
    async deleteProduct ( {datos} ) { 
        let obj = {...datos}
        return await productos.deleteById( obj.id )
    }
    
}


