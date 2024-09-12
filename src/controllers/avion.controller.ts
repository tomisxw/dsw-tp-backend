import { Request, Response, NextFunction } from "express";
import { AvionRepository } from "../repositories/avion.repository.js";
import { Avion } from "../models/avion.entity.js";

const repository = new AvionRepository()


function sanitizeAvionInput(req: Request, res: Response, next: NextFunction) {
    req.body.sanitizedInput = {
        id_avion: req.body.id_avion,
        modelo: req.body.modelo,
        capacidad_pasajeros: req.body.capacidad_pasajeros,
        fabrincante: req.body.fabrincante,
        anio_fabricacion: req.body.anio_fabricacion,
        capacidad_kg: req.body.capacidad_kg,
    }
}


async function findAll(req:Request, res:Response){
    const avion = await repository.findAll();
    res.json(avion)
}


async function findOne(req: Request, res: Response){
    const id = req.params.id; 
    const avion = await repository.findOne({id})
    if(!avion){
        return res.status(404).send('Avion no encontrado')
    }
    return res.json(avion)    
}


async function add(req:Request, res:Response){
    const input = req.body.sanitizedInput
    const avionInput = new Avion(
        input.modelo,
        input.capacidad_pasajeros,
        input.fabrincante,
        input.anio_fabricacion,
        input.capacidad_kg
    )
    const avion = await repository.add(avionInput)
    return res.status(201).send({ message: 'Character created', data: avion })
}

export{ findAll, findOne, sanitizeAvionInput, add}

