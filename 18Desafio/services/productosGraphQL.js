import ProductosRepo from '../models/repository/productos.js'


const productos = new ProductosRepo()

export default class productosServices {
    constructor() {
        
    }

    async getProducts () { 
        return await productos.getProducts()
    }
    
    async postProduct ( {datos} ) { 
        let obj = {...datos}
        return await productos.postProduct( obj )
    }
    
    async updateProduct ( {datos} ) { 
        let obj = {...datos}
        return await productos.updateProduct( obj )
    }
    
    async deleteProduct ( {datos} ) { 
        let obj = {...datos}
        return await productos.deleteProduct( obj.id )
    }
    
}


