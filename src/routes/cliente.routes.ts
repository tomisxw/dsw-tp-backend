import { Router } from "express";
import { findAll, findOne, sanitizeClienteInput, add, update, remove } from "../controllers/cliente.controller.js";

export const clienteRouter = Router()

clienteRouter.get('/', findAll)
clienteRouter.get('/:id', findOne)
clienteRouter.post('/', sanitizeClienteInput, add)
clienteRouter.put('/:id', sanitizeClienteInput, update)
clienteRouter.patch('/:id', sanitizeClienteInput, update)
clienteRouter.delete('/:id', remove)