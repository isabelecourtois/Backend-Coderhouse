const express = require('express')
const { Router } = express

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/static', express.static(__dirname + '/public'))

const productos = [];

const routerProductos = new Router()

//Get todos los productos
routerProductos.get('/', (req, res) => {
  res.json(productos)
});


//Get productos por ID
routerProductos.get('/:id', (req, res) => {
  let  {id}  = req.params
  const foundProduct = productos.find((producto) => producto.id === parseInt(id));

  if (!foundProduct) {
    const error = new Error('Error, no existe ID')
    res.json(error)
  }

  res.json(foundProduct)
});

//Post producto nuevo
routerProductos.post('/', (req, res) => {
  const length = productos.length
  const idProducto = length
    productos.push({
      ...req.body, ...{id : idProducto + 1}
    }),
    res.json({ok: 'ok'})
}); 

//Put actualiza un producto
routerProductos.put('/:id', (req, res) => {
  let  { id }  = req.params
  const newProduct = req.body
  const modProduct =  productos[parseInt(id)-1]
  productos[parseInt(id)-1] = newProduct

  res.json({ProductoAnterior: modProduct, ProductoModificado: newProduct}); 
})


//Delete elimina según su ID
routerProductos.delete('/:id', (req, res) => {
  const { id } = req.params
  const deletedProduct = productos.splice(parseInt(id) - 1, 1)

  res.json({ borrada: deletedProduct })
})

app.use('/productos', routerProductos)

const PORT = 8080

const server = app.listen(PORT, () => {
  console.log('servidor escuchando en el ' + PORT)
})