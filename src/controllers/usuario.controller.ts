import {Request, Response, NextFunction, response} from 'express'
import { UsuarioRepository } from '../repositories/usuario.repository.js'
import { Usuario } from '../models/usuario.entity.js'
import { request } from 'http';

const repository = new UsuarioRepository()

function sanitizeUsuarioInput(req: Request, res: Response, next: NextFunction) {
    req.body.sanitizedInput = {
        id_usuario: req.body.id_usuario,
        user: req.body.user,
        fecha_registro: req.body.fecha_registro,
        email: req.body.email,
        rol: req.body.rol,
        dni: req.body.dni,
        telefono: req.body.telefono,
    };
    next();
}
async function findAll(req: Request, res: Response) {
    const usuarios = await repository.findAll(); 
    res.json(usuarios); 
    
}

async function findOne(req:Request, res:Response){
    const id = req.params.id
    const usuario = await repository.findOne({id})
    if (!usuario){
        return res.status(404).send('Usuario no encontrado')
    }
    return res.json(usuario)
}

async function add(req:Request, res:Response){
    const input = req.body.sanitizedInput
    const usuarioInput = new Usuario(
        input.user,
        input.fecha_registro,
        input.email,
        input.rol,
        input.dni,
        input.telefono
    )
    const usuario = await repository.add(usuarioInput)
    return res.status(201).send({ message: 'Character created', data: usuario })
}

async function update(req:Request, res:Response){
    try{
        const id = req.params.id ;
        const usuario:Usuario = req.body.sanitizedInput ;

        const usuarioActualizado = await repository.update(id, usuario);

        return res.status(200).json(usuarioActualizado);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al actualizar el usuario' });
    }
    
}

async function remove(req:Request , res:Response){
    try{
        const id = req.params.id 
        await repository.delete({id})
        return res.status(200).json({message: 'Usuario borrado con exito'})
    }catch(error){
        console.error(error)
        return res.status(500).json({ message: 'Error al borrar el usuario' });
    }

}

export{findAll, findOne, add, sanitizeUsuarioInput, update ,remove}