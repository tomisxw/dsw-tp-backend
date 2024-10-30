import { Repository } from "../shared/repository.js";
import { Aeropuerto } from "../models/aeropuerto.entity.js";
import { pool } from "../shared/conn.mysql.js";
import { ResultSetHeader, RowDataPacket } from "mysql2";


export class AeropuertoRepository implements Repository<Aeropuerto>{

    
    public async findAll(): Promise<Aeropuerto[] | undefined>{
        const [aeropuerto] = await pool.query('SELECT * FROM aeropuerto')
        return aeropuerto as Aeropuerto[]
    }

    public async findOne(item: { id: string; }): Promise<Aeropuerto | undefined> {
        const id = Number.parseInt(item.id)
        const [aeropuertos] = await pool.query<RowDataPacket[]>('SELECT * FROM aeropuerto where id_aeropuerto = ?',
            [id])
        if(aeropuertos.length == 0){
            return undefined
        }
        const aeropuerto = aeropuertos[0] as Aeropuerto
        return aeropuerto
    }

    public async add(aeropuertoInput: Aeropuerto): Promise<Aeropuerto | undefined>{
        const {id_aeropuerto, ...aeropuertoRow} = aeropuertoInput
        const [result] = await pool.query<ResultSetHeader>('INSERT INTO aeropuerto SET ?',
            [aeropuertoRow])
        aeropuertoInput.id_aeropuerto = result.insertId
        return aeropuertoInput
    } 

    public async update(id: string, item: Aeropuerto): Promise<Aeropuerto | undefined> {
        const idA = Number.parseInt(id) ; 
        await pool.query(
            'UPDATE aeropuerto SET nombre = ?, capacidad_aviones = ?, numero_terminales=? WHERE id_aeropuerto = ?',
            [item.nombre, item.capacidad_aviones, item.numero_terminales, idA]
        )
    return item;
    }

    public async delete(item:{id:string}):Promise<Aeropuerto | undefined>{
        const id = Number.parseInt(item.id);
        const [result] = await pool.query<ResultSetHeader>('DELETE FROM aeropuerto WHERE id_aeropuerto = ?', [id])
        if (result.affectedRows === 0){
            throw new Error ('No se pudo borrar el Aeropuerto, ID no encontrado.') ;

        }
        return ;
    }
}