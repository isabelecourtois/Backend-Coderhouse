import { Router } from "express";
import { getFaker } from "../controllers/faker.js";

const faker =  Router();

faker.get("/productos-test", getFaker);

export default faker