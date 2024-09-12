import { Router } from "express";
import { add, findAll, findOne, sanitizeUsuarioInput} from "../controllers/usuario.controller.js";

export const UsuarioRouter = Router()
UsuarioRouter.get('/', findAll)
UsuarioRouter.get('/:id', findOne)
UsuarioRouter.put('/',add, sanitizeUsuarioInput)