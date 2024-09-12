import { Repository } from "../shared/repository.js";
import { pool } from "../shared/conn.mysql.js";
import { Avion } from "../models/avion.entity.js";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export class AvionRepository implements Repository<Avion>{
    public async findAll(): Promise<Avion[] | undefined>{
        const [avion] = await pool.query('SELECT * FROM avion')
        return avion as Avion[]   
    }
    public async findOne(item: { id: string; }): Promise<Avion | undefined> {
        const id = Number.parseInt(item.id);
        const [aviones] = await pool.query<RowDataPacket[]>('SELECT * FROM avion where id_avion = ?',
            [id])
        if(aviones.length == 0){
            return undefined
        }
        const avion = aviones[0] as Avion
        return avion
    }

    public async add(avionInput:Avion):Promise<Avion | undefined>{
        const {id_avion, ...avionRow} = avionInput ; 
        const [result]  = await pool.query<ResultSetHeader>('INSERT INTO avion SET ?',
            [avionRow])
        avionInput.id_avion = result.insertId ; 
        return avionInput
    }
}