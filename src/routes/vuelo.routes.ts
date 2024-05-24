import { Router } from "express";
import { findAll, findOne, sanitizeVueloInput, add, update, remove } from "../controllers/vuelo.controller.js";

export const vueloRouter = Router()

vueloRouter.get('/', findAll)
vueloRouter.get('/:id', findOne)
vueloRouter.post('/', sanitizeVueloInput, add)
vueloRouter.put('/:id', sanitizeVueloInput, update)
vueloRouter.patch('/:id', sanitizeVueloInput, update)
vueloRouter.delete('/:id', remove)