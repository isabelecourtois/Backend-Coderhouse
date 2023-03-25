import { Router } from "express";
import { getInfo } from "../controllers/info.js";
import {args} from "../server.js"

const info =  Router();

info.get("/info", getInfo)

export default info