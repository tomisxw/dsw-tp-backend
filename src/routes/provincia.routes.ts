import { Router } from "express";
import { add, findAll, findOne, sanitizeProvinciaInput, update, remove } from "../controllers/provincia.controller.js";

export const ProvinciaRouter = Router()
ProvinciaRouter.get('/', findAll)
ProvinciaRouter.get('/:id', findOne)
ProvinciaRouter.post('/', sanitizeProvinciaInput, add)
ProvinciaRouter.put('/:id', sanitizeProvinciaInput, update)
ProvinciaRouter.delete('/:id', remove)