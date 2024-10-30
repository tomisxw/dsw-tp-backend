import { Repository } from "../shared/repository.js";
import { Vuelo } from "../models/vuelo.entity.js";
import { pool } from "../shared/conn.mysql.js";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import {format} from 'date-fns'



export class VueloRepository implements Repository<Vuelo>{

    public async findAll(): Promise<Vuelo[] | undefined> {
        const [vuelos] = await pool.query('SELECT * FROM vuelo')
        return vuelos as Vuelo[]
    }
    
    public async findOne(item: {id:string}): Promise<Vuelo| undefined>{
        const id = Number.parseInt(item.id)
        const [vuelos] = await pool.query<RowDataPacket[]>('SELECT * FROM vuelo where id_vuelo = ?', [id])
        if(vuelos.length == 0){
            return undefined
        }
        const vuelo = vuelos[0] as Vuelo
        return vuelo
    }

    // Método para verificar la existencia de un avión por id_avion
    public async existeAvion(id_avion: number): Promise<boolean> {
        const [rows] = await pool.query<RowDataPacket[]>('SELECT 1 FROM avion WHERE id_avion = ?', [id_avion]);
        return rows.length > 0;
    }

    // Método para verificar la existencia de un aeropuerto por id_aeropuerto
    public async existeAeropuerto(id_aeropuerto: number): Promise<boolean> {
        const [rows] = await pool.query<RowDataPacket[]>('SELECT 1 FROM aeropuerto WHERE id_aeropuerto = ?', [id_aeropuerto]);
        return rows.length > 0;
    }

    public async add(vueloInput: Vuelo): Promise<Vuelo | undefined>{
        const {id_vuelo , ...vueloRow} = vueloInput 
        const [result] = await pool.query<ResultSetHeader>('INSERT INTO vuelo SET ?',
            [vueloRow])
        vueloInput.id_vuelo = result.insertId
        return vueloInput
    }


    public async update(id: string, item: Vuelo): Promise<Vuelo | undefined> {
        const idV = Number.parseInt(id) ;
        const fecha_sali = format(new Date(item.fecha_salida), 'yyyy-MM-dd HH:mm:ss');
        const fecha_lleg = format(new Date(item.fecha_llegada), 'yyyy-MM-dd HH:mm:ss');
        const [result] = await pool.query<ResultSetHeader>(
            'UPDATE vuelo SET  numero_vuelo = ?, fecha_salida = ?, fecha_llegada = ?, estado = ?, id_avion = ?, id_aeropuerto_origen= ?, id_aeropuerto_destino = ? WHERE id_vuelo = ?',
            [item.numero_vuelo , fecha_sali, fecha_lleg, item.estado, item.id_avion, item.id_aeropuerto_origen, item.id_aeropuerto_destino, idV]);
        if (result.affectedRows === 0) {
            throw new Error('No se pudo actualizar el vuelo, ID no encontrado.');
        }
            
    return item;
    }


    public async delete(item:{id:string}):Promise<Vuelo | undefined>{
        const id = Number.parseInt(item.id);
        const [result] = await pool.query<ResultSetHeader>('DELETE FROM vuelo WHERE id_vuelo = ?', [id])
        if (result.affectedRows === 0) {
            throw new Error('No se pudo borrar el vuelo, ID no encontrado.');
        }
            
        return ;

    }
}
