import {Request, Response, NextFunction} from "express"
import { ClienteRepository } from "../repositories/cliente.repository.js"
import { Cliente } from "../models/cliente.entity.js"

const repository = new ClienteRepository()

function sanitizeClienteInput(req: Request, res: Response, next: NextFunction){
    req.body.sanitizedInput = {
        dni: req.body.dni,
        nombre: req.body.nombre, 
        apellido: req.body.apellido, 
        edad: req.body.edad, 
        email: req.body.email, 
        telefono: req.body.telefono, 
        checkin: req.body.checkin,
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
    const cliente = repository.findOne({codigo:req.params.id})
    if(!cliente){
        return res.status(404).send({message: 'Cliente Not Found!'})
    }
    res.json({data:cliente})
}

function add(req: Request,res:Response) {
    const input = req.body.sanitizedInput

    const clienteInput = new Cliente(
        input.dni, 
        input.nombre, 
        input.apellido, 
        input.edad, 
        input.email,
        input.telefono, 
        input.checkin
    )
    
    const vuelo = repository.add(clienteInput)
    return res.status(201).send ({message: 'Cliente Created', data:vuelo})
}

function update(req: Request,res:Response){
    req.body.sanitizedInput.dni = req.params.id
    const cliente = repository.update(req.body.sanitizedInput)

    if(!cliente){
        return res.status(404).send({message: 'Cliente Not Found!'})
    }

    return res.status(200).send({message: 'Cliente updated successfully', data: cliente})
}


function remove(req: Request,res:Response){
    const cliente = repository.delete({codigo:req.params.id})

    if(!cliente){
        res.status(404).send({message:'Cliente not found'})
    }
    else{
        res.status(200).send({message: 'Cliente deleted successfully'})
    }
}


export{sanitizeClienteInput, findAll, findOne, add, update, remove}