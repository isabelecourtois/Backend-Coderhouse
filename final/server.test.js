import { expect } from "chai"
import axios from "axios"


const url = 'http://localhost:8080/productos'

describe("Comprobando el funcionamiento endpoint /productos", () => {

    it('GET productos ', async () => {
        let response = await axios(`${url}`)
        expect(response.status).to.eql(200)
        expect(response.data).to.be.an('array')
    })

    it("POST a product", async function () {
        const newProd = { producto: "GoPro2", precio: 3800, thumbnail: "https://cdn2.iconfinder.com/data/icons/geest-travel-kit/128/travel_journey-20-512.png" };
        const response = await axios.post(`${url}`, newProd);
        expect(response.data, { id: response.data.id, ...newProd })

    })

    it("UPDATE Product", async function() {
        const newProd = { producto: "GoPro2", precio: 3800, thumbnail: "https://cdn2.iconfinder.com/data/icons/geest-travel-kit/128/travel_journey-20-512.png" };
        let response = await axios.post(`${url}`, newProd);
        let insertedProduct = response.data;
        insertedProduct.precio = 800;
        response = await axios.put(`http://localhost:8080/productos/${insertedProduct.id}`, insertedProduct);
        expect(response.data, insertedProduct)
  
    })

    it("DELETE a product", async function() {
        const newProd = { producto: "GoPro2", precio: 3800, thumbnail: "https://cdn2.iconfinder.com/data/icons/geest-travel-kit/128/travel_journey-20-512.png" };
        let response = await axios.post(`${url}`, newProd);
        let insertedProduct = response.data; 
        response = await axios.delete(`http://localhost:8080/productos/${insertedProduct.id}`);
        expect(response.data.deletedId, insertedProduct.id)
    })

})
