import { Repository } from "../shared/repository.js";
import { Localidad } from "../models/localidad.entity.js";
import { pool } from "../shared/conn.mysql.js";
import { ResultSetHeader, RowDataPacket } from "mysql2";


export class LocalidadRepository implements Repository<Localidad>{

    public async findAll(): Promise<Localidad[] | undefined>{
        const [localidad] = await pool.query('SELECT * FROM Localidad')
        return localidad as Localidad[]
    }

    public async findOne(item: { id: string; }): Promise<Localidad | undefined> {
        const id = Number.parseInt(item.id)
        const [localidades] = await pool.query<RowDataPacket[]>('SELECT * FROM Localidad where id_localidad = ?',
            [id])
        if(localidades.length == 0){
            return undefined
        }
        const localidad = localidades[0] as Localidad
        return localidad
    }

    public async add(localidadInput: Localidad): Promise<Localidad | undefined>{
        const {id_localidad, ...LocalidadRow} = localidadInput
        const [result] = await pool.query<ResultSetHeader>('INSERT INTO Localidad SET ?',
            [LocalidadRow])
        localidadInput.id_localidad = result.insertId
        return localidadInput
    } 

    public async update(id: string, item: Localidad): Promise<Localidad | undefined> {
        const idL = Number.parseInt(id) ; 
        await pool.query(
            'UPDATE Localidad SET nombre = ?, id_provincia = ? WHERE id_localidad = ?',
            [item.nombre, item.id_provincia, idL]
        )
    return item;
    }

    public async delete(item:{id:string}):Promise<Localidad | undefined>{
        const id = Number.parseInt(item.id);
        const [result] = await pool.query<ResultSetHeader>('DELETE FROM Localidad WHERE id_localidad = ?', [id])
        if (result.affectedRows === 0){
            throw new Error ('No se pudo borrar la Localidad, ID no encontrado.') ;

        }
        return ;
    }
}