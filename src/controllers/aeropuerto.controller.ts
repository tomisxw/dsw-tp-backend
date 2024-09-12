import { Request, Response , NextFunction} from "express";
import { AeropuertoRepository } from "../repositories/aeropuerto.repository.js";
import { Aeropuerto } from "../models/aeropuerto.entity.js";

const repository = new AeropuertoRepository()

function sanitizeAeropuertoInput(req: Request, res: Response, next: NextFunction) {
    req.body.sanitizedInput = {
        id_aeropuerto: req.body.id_aeropuerto,
        name: req.body.name,
        capacidad_aviones: req.body.capacidad_aviones,
        numero_terminales: req.body.numero_terminales,
    }
}


async function findAll(req: Request, res: Response){
    const aeropuertos = await repository.findAll();
    res.json(aeropuertos)
}

async function findOne(req:Request, res:Response){
    const id = req.params.id
    const aeropuerto = await repository.findOne({id})
    if (!aeropuerto){
        return res.status(404).send('Aeropuerto no encontrado')
    }
    return res.json(aeropuerto)
}

async function add(req:Request, res:Response){
    const input = req.body.sanitizedInput
    const aeropuertoInput = new Aeropuerto(
        input.name,
        input.capacidad_aviones,
        input.numero_terminales
    )
    const aeropuerto = await repository.add(aeropuertoInput)
    return res.status(201).send({ message: 'Character created', data: aeropuerto })
}

export{ findAll, findOne, sanitizeAeropuertoInput, add }