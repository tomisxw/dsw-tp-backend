import { Router } from 'express';
import { add, findAll, findOne, sanitizePasajeInput, update, remove } from '../controllers/pasaje.controller.js';

export const PasajeRouter = Router();

PasajeRouter.get('/', findAll);
PasajeRouter.get('/:id_vuelo/:fecha_emision/:id_pasaje/:id_usuario', findOne);
PasajeRouter.post('/', sanitizePasajeInput, add);
PasajeRouter.put('/:id_vuelo/:fecha_emision/:id_pasaje/:id_usuario', sanitizePasajeInput, update);
PasajeRouter.delete('/:id_vuelo/:fecha_emision/:id_pasaje/:id_usuario', remove);
