//import { Router } from "express";
import Router from "koa-router";
import GraphqlController from '../controllers/productosGraphQL.js'

const routerProductosGraphql = new Router({prefix: '/productosGraphQL'})

routerProductosGraphql.use('/', new GraphqlController())

export default routerProductosGraphql 