import { Repository } from "../shared/repository.js";
import { Usuario } from "../models/usuario.entity.js";
import { pool } from "../shared/conn.mysql.js";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import {format} from 'date-fns'



export class UsuarioRepository implements Repository<Usuario>{

    public async findAll(): Promise<Usuario[] | undefined> {
        const [usuarios] = await pool.query('SELECT * FROM usuario')
        return usuarios as Usuario[]
    }
    
    public async findOne(item: {id:string}): Promise<Usuario| undefined>{
        const id = Number.parseInt(item.id)
        const [usuarios] = await pool.query<RowDataPacket[]>('SELECT * FROM usuario where id_usuario = ?', [id])
        if(usuarios.length == 0){
            return undefined
        }
        const usuario = usuarios[0] as Usuario
        return usuario
    }


    public async add(usuarioInput: Usuario): Promise<Usuario | undefined>{
        const {id_usuario , ...usuarioRow} = usuarioInput 
        const [result] = await pool.query<ResultSetHeader>('INSERT INTO usuario SET ?',
            [usuarioRow])
        usuarioInput.id_usuario = result.insertId
        return usuarioInput
    }


    public async update(id: string, item: Usuario): Promise<Usuario | undefined> {
        const idU = Number.parseInt(id) ;
        const formattedDate = format(new Date(item.fecha_registro), 'yyyy-MM-dd HH:mm:ss');
        const [result] = await pool.query<ResultSetHeader>(
            'UPDATE usuario SET dni = ?, email = ?, fecha_registro = ?, rol = ?, telefono= ?, user = ? WHERE id_usuario = ?',
            [item.dni , item.email, formattedDate, item.rol, item.telefono, item.user, idU]);
        
    

        if (result.affectedRows === 0) {
            throw new Error('No se pudo actualizar el usuario, ID no encontrado.');
        }
            
    return item;
    }


    public async delete(item:{id:string}):Promise<Usuario | undefined>{
        const id = Number.parseInt(item.id);
        const [result] = await pool.query<ResultSetHeader>('DELETE FROM usuario WHERE id_usuario = ?', [id])
        if (result.affectedRows === 0) {
            throw new Error('No se pudo borrar el usuario, ID no encontrado.');
        }
            
        return ;

    }
}