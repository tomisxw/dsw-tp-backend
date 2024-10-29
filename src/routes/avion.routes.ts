import { Router } from "express";
import { add, findAll, findOne, sanitizeAvionInput, update, remove} from "../controllers/avion.controller.js";

export const AvionRouter = Router()
AvionRouter.get('/', findAll)
AvionRouter.get('/:id', findOne)
AvionRouter.post('/', sanitizeAvionInput, add)
AvionRouter.put('/:id', sanitizeAvionInput, update)
AvionRouter.delete('/:id', remove)