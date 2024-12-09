import { Request, Response , NextFunction} from "express";
import { ProvinciaRepository } from "../repositories/provincia.repository.js";
import { Provincia } from "../models/provincia.entity.js";


const repository = new ProvinciaRepository()

function sanitizeProvinciaInput(req: Request, res: Response, next: NextFunction) {
    req.body.sanitizedInput = {
        id_provincia: req.body.id_provincia,
        nombre: req.body.nombre,
    };
    next()
}

async function findAll(req: Request, res: Response){
    const provincia = await repository.findAll();
    res.json(provincia)
}

async function findOne(req:Request, res:Response){
    const id = req.params.id
    const provincia = await repository.findOne({id})
    if (!provincia){
        return res.status(404).send('Provincia no encontrada')
    }
    return res.json(provincia)
}

async function add(req:Request, res:Response){
    const input = req.body.sanitizedInput
    const provinciaInput = new Provincia(
        input.nombre
    )
    const provincia = await repository.add(provinciaInput)
    return res.status(201).send({ message: 'Provincia creada', data: provincia })
}
async function update(req:Request, res:Response){
    try{
        const id= req.params.id ;
        const provincia:Provincia = req.body.sanitizedInput ; 
        const provinciasActualizadas = await repository.update(id, provincia)
        return res.status(200).json(provinciasActualizadas);
    } catch (error){
        console.error(error);
        return res.status(500).json({ message: 'Error al actualizar la provincia' });
    }
}

async function remove(req:Request, res:Response){
    try{
        const id = req.params.id;
       await repository.delete({id})
       return res.status(200).json({message: 'Provincia borrada con exito'})
    }catch(error){
        console.error(error)
        return res.status(500).json({message:'Error al borrar la provincia, esta no fue encontrado'})

    }
}


export{ findAll, findOne, sanitizeProvinciaInput, add, update , remove}