import {Request, Response, NextFunction} from 'express'
import { VueloRepository } from '../repositories/vuelo.repository.js'
import { Vuelo } from '../models/vuelo.entity.js'

const repository = new VueloRepository()

function sanitizedVueloInput(req: Request, res: Response, next: NextFunction) {
    req.body.sanitizedInput = {
        id_vuelo: req.body.id_vuelo,
        numero_vuelo: req.body.numero_vuelo,
        fecha_salida: req.body.fecha_salida,
        fecha_llegada: req.body.fecha_llegada,
        estado: req.body.estado,
        id_avion: req.body.id_avion,
        id_aeropuerto_origen: req.body.id_aeropuerto_origen,
        id_aeropuerto_destino: req.body.id_aeropuerto_destino,
    };
    next();
}
async function findAll(req: Request, res: Response) {
    const vuelos = await repository.findAll(); 
    res.json(vuelos); 
    
}

async function findOne(req:Request, res:Response){
    const id = req.params.id
    const vuelo = await repository.findOne({id})
    if (!vuelo){
        return res.status(404).send('Vuelo no encontrado')
    }
    return res.json(vuelo)
}

async function findByDestino(req: Request, res: Response) {
    const { id_aeropuerto_destino } = req.params;

    try {
        const vuelos = await repository.vuelosDisponibles(Number(id_aeropuerto_destino));

        if (!vuelos || vuelos.length === 0) {
            return res.status(404).send({ message: 'No hay vuelos disponibles para este destino.' });
        }

        res.json(vuelos);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error al obtener vuelos por destino.' });
    }
}

async function add(req:Request, res:Response){
    const input = req.body.sanitizedInput;

    // Verificar existencia del avión
    const avionExists = await repository.existeAvion(input.id_avion);
    if (!avionExists) {
        return res.status(400).send({ message: `El avión con id ${input.id_avion} no existe.` });
    }

    // Verificar existencia del aeropuerto de origen
    const aeropuertoOrigenExists = await repository.existeAeropuerto(input.id_aeropuerto_origen);
    if (!aeropuertoOrigenExists) {
        return res.status(400).send({ message: `El aeropuerto de origen con id ${input.id_aeropuerto_origen} no existe.` });
    }

    // Verificar existencia del aeropuerto de destino
    const aeropuertoDestinoExists = await repository.existeAeropuerto(input.id_aeropuerto_destino);
    if (!aeropuertoDestinoExists) {
        return res.status(400).send({ message: `El aeropuerto de destino con id ${input.id_aeropuerto_destino} no existe.` });
    }
    const vueloInput = new Vuelo(
        input.numero_vuelo,
        input.fecha_salida,
        input.fecha_llegada,
        input.estado,
        input.id_avion,
        input.id_aeropuerto_origen,
        input.id_aeropuerto_destino,
        )
    const vuelo = await repository.add(vueloInput)
    return res.status(201).send({ message: 'Character created', data: vuelo })
}

async function update(req:Request, res:Response){
    try{
        const id = req.params.id ;
        const vuelo:Vuelo = req.body.sanitizedInput ;

        // Validación de la existencia de las llaves foráneas
        const avionExists = await repository.existeAvion(vuelo.id_avion);
        if (!avionExists) {
            return res.status(400).json({ message: `El avión con id ${vuelo.id_avion} no existe.` });
        }

        const aeropuertoOrigenExists = await repository.existeAeropuerto(vuelo.id_aeropuerto_origen);
        if (!aeropuertoOrigenExists) {
            return res.status(400).json({ message: `El aeropuerto de origen con id ${vuelo.id_aeropuerto_origen} no existe.` });
        }

        const aeropuertoDestinoExists = await repository.existeAeropuerto(vuelo.id_aeropuerto_destino);
        if (!aeropuertoDestinoExists) {
            return res.status(400).json({ message: `El aeropuerto de destino con id ${vuelo.id_aeropuerto_destino} no existe.` });
        }

        const vueloActualizado = await repository.update(id, vuelo);

        return res.status(200).json(vueloActualizado);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al actualizar el vuelo' });
    }
    
}

async function remove(req:Request , res:Response){
    try{
        const id = req.params.id 
        await repository.delete({id})
        return res.status(200).json({message: 'Vuelo borrado con exito'})
    }catch(error){
        console.error(error)
        return res.status(500).json({ message: 'Error al borrar el vuelo' });
    }

}

export{findAll, findOne, add, sanitizedVueloInput, update ,remove, findByDestino}