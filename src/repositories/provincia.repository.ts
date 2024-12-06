import { Repository } from "../shared/repository.js";
import { Provincia } from "../models/provincia.entity.js";
import { pool } from "../shared/conn.mysql.js";
import { ResultSetHeader, RowDataPacket } from "mysql2";


export class ProvinciaRepository implements Repository<Provincia>{

    public async findAll(): Promise<Provincia[] | undefined>{
        const [provincia] = await pool.query('SELECT * FROM Provincia')
        return provincia as Provincia[]
    }

    public async findOne(item: { id: string; }): Promise<Provincia | undefined> {
        const id = Number.parseInt(item.id)
        const [provincias] = await pool.query<RowDataPacket[]>('SELECT * FROM Provincia where id_provincia = ?',
            [id])
        if(provincias.length == 0){
            return undefined
        }
        const provincia = provincias[0] as Provincia
        return provincia
    }

    public async add(provinciaInput: Provincia): Promise<Provincia | undefined>{
        const {id_provincia, ...ProvinciaRow} = provinciaInput
        const [result] = await pool.query<ResultSetHeader>('INSERT INTO Provincia SET ?',
            [ProvinciaRow])
        provinciaInput.id_provincia = result.insertId
        return provinciaInput
    } 

    public async update(id: string, item: Provincia): Promise<Provincia | undefined> {
        const idP = Number.parseInt(id) ; 
        await pool.query(
            'UPDATE Provincia SET nombre = ? WHERE id_provincia = ?',
            [item.nombre, idP]
        )
    return item;
    }

    public async delete(item:{id:string}):Promise<Provincia | undefined>{
        const id = Number.parseInt(item.id);
        const [result] = await pool.query<ResultSetHeader>('DELETE FROM Provincia WHERE id_provicia = ?', [id])
        if (result.affectedRows === 0){
            throw new Error ('No se pudo borrar la provincia, ID no encontrado.') ;

        }
        return ;
    }
}