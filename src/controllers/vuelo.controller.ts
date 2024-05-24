import {Request, Response, NextFunction} from "express"
import { VueloRepository } from "../repositories/vuelo.repository.js"
import { Vuelo } from "../models/vuelo.entity.js"

const repository = new VueloRepository()

function sanitizeVueloInput(req: Request, res: Response, next: NextFunction){
    req.body.sanitizedInput = {
        codigo: req.body.codigo,
        aerolinea: req.body.aerolinea, 
        estado: req.body.estado, 
        duracion: req.body.duracion, 
        cupo: req.body.cupo, 
        disponibilidad: req.body.disponibilidad,
    }
    Object.keys (req.body.sanitizedInput).forEach(key=> {
        if (req.body.sanitizedInput[key] === undefined) delete req.body.sanitizedInput[key]
    })
    next()
}

function findAll(req:Request,res:Response) {
    res.json({data:repository.findAll()})
}

function findOne(req: Request,res:Response){
    const vuelo = repository.findOne({codigo:req.params.id})
    if(!vuelo){
        return res.status(404).send({message: 'Vuelo Not Found!'})
    }
    res.json({data:vuelo})
}

function add(req: Request,res:Response) {
    const input = req.body.sanitizedInput

    const vueloInput = new Vuelo(
        input.codigo, 
        input.aerolinea, 
        input.estado, 
        input.duracion, 
        input.cupo, 
        input.disponibilidad
    )
    
    const vuelo = repository.add(vueloInput)
    return res.status(201).send ({message: 'Vuelo Created', data:vuelo})
}

function update(req: Request,res:Response){
    req.body.sanitizedInput.codigo = req.params.id
    const vuelo = repository.update(req.body.sanitizedInput)

    if(!vuelo){
        return res.status(404).send({message: 'Vuelo Not Found!'})
    }

    return res.status(200).send({message: 'Vuelo updated successfully', data: vuelo})
}


function remove(req: Request,res:Response){
    const vuelo = repository.delete({codigo:req.params.id})

    if(!vuelo){
        res.status(404).send({message:'Vuelo not found'})
    }
    else{
        res.status(200).send({message: 'Vuelo deleted successfully'})
    }
}


export{sanitizeVueloInput, findAll, findOne, add, update, remove}