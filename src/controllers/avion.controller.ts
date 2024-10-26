import { Request, Response, NextFunction } from "express";
import { AvionRepository } from "../repositories/avion.repository.js";
import { Avion } from "../models/avion.entity.js";

const repository = new AvionRepository()


function sanitizeAvionInput(req: Request, res: Response, next: NextFunction) {
    req.body.sanitizedInput = {
        id_avion: req.body.id_avion,
        modelo: req.body.modelo,
        capacidad_pasajeros: req.body.capacidad_pasajeros,
        fabricante: req.body.fabricante,
        anio_fabricacion: req.body.anio_fabricacion,
        capacidad_kg: req.body.capacidad_kg,
    };
    next()
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
        input.fabricante,
        input.anio_fabricacion,
        input.capacidad_kg
    )
    const avion = await repository.add(avionInput)
    return res.status(201).send({ message: 'Character created', data: avion })
}

async function update(req: Request, res:Response){
try{
    const id = req.params.id ; 
    const avion: Avion = req.body.sanitizedInput;
    const avionActualizado = await repository.update(id, avion) ;

    return res.status(200).json(avionActualizado);

}catch(error){
    console.error(error);
    return res.status(500).json({ message: 'Error al actualizar el avion' });
}
}

async function remove(req:Request, res:Response){
    try{
        const id = req.params.id
        await repository.delete({id})
        return res.status(200).json({message: 'Avion borrado con exito'})

    }catch(error){
        console.error(error)
        return res.status(500).json({ message: 'Error al borrar el usuario' });
    }
}

export{ findAll, findOne, sanitizeAvionInput, add, update, remove}

