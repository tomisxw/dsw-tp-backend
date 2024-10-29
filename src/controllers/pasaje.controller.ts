import { Request, Response, NextFunction } from 'express';
import { PasajeRepository } from '../repositories/pasaje.repository';
import { Pasaje } from '../models/pasaje.entity';

const repository = new PasajeRepository();

function sanitizePasajeInput(req: Request, res: Response, next: NextFunction) {
    req.body.sanitizedInput = {
        fecha_emision: req.body.fecha_emision,
        precio: req.body.precio,
        asiento: req.body.asiento,
        clase: req.body.clase,
        id_vuelo: req.body.id_vuelo,
        id_usuario: req.body.id_usuario,
        id_pasaje: req.body.id_pasaje,
    };
    next();
}

async function findAll(req: Request, res: Response) {
    const pasajes = await repository.findAll();
    res.json(pasajes);
}

async function findOne(req: Request, res: Response) {
    const { id_vuelo, fecha_emision, id_pasaje, id_usuario } = req.params;
    const pasaje = await repository.findOne({ id_vuelo, fecha_emision, id_pasaje, id_usuario });
    if (!pasaje) {
        return res.status(404).send('Pasaje no encontrado');
    }
    return res.json(pasaje);
}

async function add(req: Request, res: Response) {
    const input = req.body.sanitizedInput;
    const pasajeInput = new Pasaje(
        input.fecha_emision,
        input.precio,
        input.asiento,
        input.clase,
        input.id_vuelo,
        input.id_usuario
    );
    const pasaje = await repository.add(pasajeInput);
    return res.status(201).send({ message: 'Pasaje creado', data: pasaje });
}

async function update(req: Request, res: Response) {
    try {
        const { id_vuelo, fecha_emision, id_pasaje, id_usuario } = req.params;
        const pasaje: Pasaje = req.body.sanitizedInput;

        const pasajeActualizado = await repository.update({ id_vuelo, fecha_emision, id_pasaje, id_usuario }, pasaje);
        return res.status(200).json(pasajeActualizado);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al actualizar el pasaje' });
    }
}

async function remove(req: Request, res: Response) {
    try {
        const { id_vuelo, fecha_emision, id_pasaje, id_usuario } = req.params;
        await repository.delete({ id_vuelo, fecha_emision, id_pasaje, id_usuario });
        return res.status(200).json({ message: 'Pasaje borrado con éxito' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al borrar el pasaje' });
    }
}

export { findAll, findOne, add, sanitizePasajeInput, update, remove };
