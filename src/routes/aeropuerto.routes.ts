import { Router } from "express";
import { add, findAll, findOne, sanitizeAeropuertoInput, update, remove } from "../controllers/aeropuerto.controller.js";

export const AeropuertoRouter = Router()
AeropuertoRouter.get('/', findAll)
AeropuertoRouter.get('/:id', findOne)
AeropuertoRouter.post('/', sanitizeAeropuertoInput, add)
AeropuertoRouter.put('/:id', sanitizeAeropuertoInput, update)
AeropuertoRouter.delete('/:id', remove)