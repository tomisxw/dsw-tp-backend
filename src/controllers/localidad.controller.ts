import { Request, Response , NextFunction} from "express";
import { LocalidadRepository } from "../repositories/localidad.repository.js";
import { Localidad } from "../models/localidad.entity.js";


const repository = new LocalidadRepository()

function sanitizeLocalidadInput(req: Request, res: Response, next: NextFunction) {
    req.body.sanitizedInput = {
        id_localidad: req.body.id_localidad,
        nombre: req.body.nombre,
        latitud: req.body.latitud,
        longitud: req.body.longitud,
        id_provincia: req.body.id_provincia,
    };
    next()
}

async function findAll(req: Request, res: Response){
    const localidad = await repository.findAll();
    res.json(localidad)
}

async function findOne(req:Request, res:Response){
    const id = req.params.id
    const localidad = await repository.findOne({id})
    if (!localidad){
        return res.status(404).send('Localidad no encontrada')
    }
    return res.json(localidad)
}

async function add(req:Request, res:Response){
    const input = req.body.sanitizedInput
    const localidadInput = new Localidad(
        input.nombre,
        input.latitud,
        input.longitud,
        input.id_provincia
    )
    const localidad = await repository.add(localidadInput)
    return res.status(201).send({ message: 'Localidad creada', data: localidad })
}
async function update(req:Request, res:Response){
    try{
        const id= req.params.id ;
        const localidad:Localidad = req.body.sanitizedInput ; 
        const localidadActualizada = await repository.update(id, localidad)
        return res.status(200).json(localidadActualizada);
    } catch (error){
        console.error(error);
        return res.status(500).json({ message: 'Error al actualizar la localidad' });
    }
}

async function remove(req:Request, res:Response){
    try{
        const id = req.params.id;
       await repository.delete({id})
       return res.status(200).json({message: 'Localidad borrada con exito'})
    }catch(error){
        console.error(error)
        return res.status(500).json({message:'Error al borrar la localidad, esta no fue encontrado'})

    }
}


async function getCoordenadas(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const coordinates = await repository.getCoordinates(id);
        if (!coordinates) {
            return res.status(404).json({ message: 'Coordenadas no encontradas para la localidad especificada' });
        }
        return res.json(coordinates);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al obtener las coordenadas', error });
    }
    }



export{ findAll, findOne, sanitizeLocalidadInput, add, update , remove, getCoordenadas}