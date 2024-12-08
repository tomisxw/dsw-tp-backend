import { Router } from "express";
import { add, findAll, findOne, sanitizeLocalidadInput, update, remove, getCoordenadas } from "../controllers/localidad.controller.js";

export const LocalidadRouter = Router()
LocalidadRouter.get('/', findAll)
LocalidadRouter.get('/:id', findOne)
LocalidadRouter.post('/', sanitizeLocalidadInput, add)
LocalidadRouter.put('/:id', sanitizeLocalidadInput, update)
LocalidadRouter.delete('/:id', remove)
LocalidadRouter.get('/:id/coordenadas', getCoordenadas)