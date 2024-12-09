import { Router } from "express"
import { add, findAll, findOne, sanitizedVueloInput, update, remove, findByDestino} from "../controllers/vuelo.controller.js";

export const VueloRouter = Router()
VueloRouter.get('/', findAll)
VueloRouter.get('/:id', findOne)
VueloRouter.get('/destino/:id_aeropuerto_destino', findByDestino); // Obtener vuelos filtrados por destino
VueloRouter.post('/', sanitizedVueloInput, add)
VueloRouter.put('/:id', sanitizedVueloInput, update)
VueloRouter.delete('/:id', remove)