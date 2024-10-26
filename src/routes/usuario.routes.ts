import { Router } from "express";
import { add, findAll, findOne, sanitizeUsuarioInput, update, remove} from "../controllers/usuario.controller.js";

export const UsuarioRouter = Router()
UsuarioRouter.get('/', findAll)
UsuarioRouter.get('/:id', findOne)
UsuarioRouter.post('/',sanitizeUsuarioInput,add)
UsuarioRouter.put('/:id', sanitizeUsuarioInput, update)
UsuarioRouter.delete('/:id', remove)