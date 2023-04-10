import { Router } from "express";
import { getRandom } from "../controllers/random.js";

const random =  Router();

random.get("/randoms/:cant?", getRandom);

export default random