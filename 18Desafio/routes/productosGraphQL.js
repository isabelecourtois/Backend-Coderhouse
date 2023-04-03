import { Router } from "express";
import GraphqlController from '../controllers/productosGraphQL.js'

const routerProductosGraphql = new Router()

routerProductosGraphql.use('/', new GraphqlController())

export default routerProductosGraphql 