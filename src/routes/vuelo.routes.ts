import { Router } from "express"
import { add, findAll, findOne, sanitizedVueloInput, update, remove} from "../controllers/vuelo.controller.js";

export const VueloRouter = Router()
VueloRouter.get('/', findAll)
VueloRouter.get('/:id', findOne)
VueloRouter.post('/', sanitizedVueloInput, add)
VueloRouter.put('/:id', sanitizedVueloInput, update)
VueloRouter.delete('/:id', remove)