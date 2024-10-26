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
    };
    next()
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
async function update(req:Request, res:Response){
    try{
        const id= req.params.id ;
        const aeropuerto:Aeropuerto =req.body.sanitizedInput ; 
        const aeropueroActualizado = await repository.update(id, aeropuerto)
        return res.status(200).json(aeropueroActualizado);
    } catch (error){
        console.error(error);
        return res.status(500).json({ message: 'Error al actualizar el aeropuerto' });
    }
}

async function remove(req:Request, res:Response){
    try{

        const id = req.params.id;
       await repository.delete({id})
       return res.status(200).json({message: 'Aeropuerto borrado con exito'})
    }catch(error){
        console.error(error)
        return res.status(500).json({message:'Error al borrar el aeropuerto'})

    }
}


export{ findAll, findOne, sanitizeAeropuertoInput, add, update , remove}