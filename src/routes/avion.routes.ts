import { Router } from "express";
import { add, findAll, findOne, sanitizeAvionInput, } from "../controllers/avion.controller.js";
import { Avion } from "../models/avion.entity.js";

export const AvionRouter = Router()
AvionRouter.get('/', findAll)
AvionRouter.get('/:id', findOne)
AvionRouter.put('/', add, sanitizeAvionInput)