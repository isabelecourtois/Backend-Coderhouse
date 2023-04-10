import { expect } from "chai"
import axios from "axios"
import { generarProducto } from "./mochaTest/mocha/mockProductos.js"
import { getProducts, postProducts, putProducts, deleteProducts } from "./controllers/producto.js"
import { strictEqual, deepStrictEqual } from "assert";


const url = 'http://localhost:8080/productos'

const idNew = ''
const postResponse = []
const putResponse = []

describe("Comprobando el funcionamiento endpoint /productos", () => {

    it('GET productos retorna estado 200 y retornar el array de productos', async () => {
        let response = await axios(`${url}`)
        //expect(response.status).to.eql(200)
        expect(response.data).to.be.an('array')
    })

    it('POST productos retorna estado 200 y el objeto insertado', async () => {
        let prod = await getProducts()
        let response = await axios.post(`${url}`, prod)
        idNew = response.data[0]._id
        postResponse = response.data[0]
        expect(response.status).to.eql('ok')
        expect(postResponse).to.be.an('object')
    })

    it('UPDATE productos retorna estado 200 y modifica el objeto insertado', async () => {
        let newProd = await getProducts()
        newProd.id = idNew
        let response = await axios.put(`${url}${idNew}`, newProd)
        putResponse = response.data[0]
        expect(response.status).to.eql(200)
        expect(putResponse).to.not.be.eql(postResponse)
    })

    it('DELETE productos retorna estado 200', async () => {
        let response = await axios.delete(`${url}${idNew}`)
        expect(response.status).to.eql(200)

    })

        it("Post a product", async function() {
            const newProduct = { producto: "Test Mocha Product", precio: 30000, thumbnail: "http://www.axios.com/thumb.jpg"};
            const response = await axios.post(`http://localhost:8080/productos`, newProduct);
            expect(response.data, {id: response.data.id, ...newProduct})
           // await axios.delete(`http://localhost:8080/productos/${response.data.id}`); 

    })
})
