import { Router } from "express";
import { add, findAll, findOne, sanitizeAeropuertoInput } from "../controllers/aeropuerto.controller.js";

export const AeropuertoRouter = Router()
AeropuertoRouter.get('/', findAll)
AeropuertoRouter.get('/:id', findOne)
AeropuertoRouter.put('/', add, sanitizeAeropuertoInput)