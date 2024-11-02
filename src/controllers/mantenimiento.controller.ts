import { Request, Response, NextFunction } from 'express';
import { MantenimientoRepository } from '../repositories/mantenimiento.repository.js';
import { Mantenimiento } from '../models/mantenimiento.entity.js';

const repository = new MantenimientoRepository();

function sanitizeMantenimientoInput(req: Request, res: Response, next: NextFunction) {
    req.body.sanitizedInput = {
        id_mantenimiento: req.body.id_mantenimiento,
        fecha: req.body.fecha,
        id_avion: req.body.id_avion,
        descripcion: req.body.descripcion,
        tipo: req.body.tipo
    };
    next();
}

async function findAll(req: Request, res: Response) {
    const mantenimientos = await repository.findAll();
    res.json(mantenimientos);
}

async function findOne(req: Request, res: Response) {
    const { id_mantenimiento, fecha, id_avion } = req.params;
    const mantenimiento = await repository.findOne({ id_mantenimiento, fecha, id_avion });
    if (!mantenimiento) {
        return res.status(404).send('Mantenimiento no encontrado');
    }
    return res.json(mantenimiento);
}

async function add(req: Request, res: Response) {
    const input = req.body.sanitizedInput;
    const avionExists = await repository.existeAvion(input.id_avion);
    if (!avionExists) {
        return res.status(400).send({ message: `El avión con id ${input.id_avion} no existe.` });
    }
    const mantenimientoInput = new Mantenimiento(
        input.id_mantenimiento,
        input.fecha,
        input.id_avion,
        input.descripcion,
        input.tipo
    );
    const mantenimiento = await repository.add(mantenimientoInput);
    return res.status(201).send({ message: 'Mantenimiento creado', data: mantenimiento });
}

async function update(req: Request, res: Response) {
    try {
        const { id_mantenimiento, fecha, id_avion } = req.params;

        const mantenimiento: Mantenimiento = req.body.sanitizedInput;

        const avionExists = await repository.existeAvion(mantenimiento.id_avion);
        if (!avionExists) {
            return res.status(400).json({ message: `El avión con id ${mantenimiento.id_avion} no existe.` });
        }

        const mantenimientoActualizado = await repository.update({ id_mantenimiento, fecha, id_avion }, mantenimiento);

        return res.status(200).json(mantenimientoActualizado);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al actualizar el mantenimiento' });
    }
}

async function remove(req: Request, res: Response) {
    try {
        const { id_mantenimiento, fecha, id_avion } = req.params;
        await repository.delete({ id_mantenimiento, fecha, id_avion });
        return res.status(200).json({ message: 'Mantenimiento borrado con éxito' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al borrar el mantenimiento' });
    }
}

export { findAll, findOne, add, sanitizeMantenimientoInput, update, remove };
