import { Router } from "express";
import { add, findAll, findOne, sanitizeMantenimientoInput, update, remove } from "../controllers/mantenimiento.controller.js";

export const MantenimientoRouter = Router();
MantenimientoRouter.get('/', findAll);
MantenimientoRouter.get('/:id_mantenimiento/:fecha/:id_avion', findOne);
MantenimientoRouter.post('/', sanitizeMantenimientoInput, add);
MantenimientoRouter.put('/:id_mantenimiento/:fecha/:id_avion', sanitizeMantenimientoInput, update);
MantenimientoRouter.delete('/:id_mantenimiento/:fecha/:id_avion', remove);
