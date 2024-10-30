import { Repository, RepositoryPasaje } from "../shared/repository.js";
import { Pasaje } from "../models/pasaje.entity.js";
import { pool } from "../shared/conn.mysql.js";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export class PasajeRepository implements RepositoryPasaje<Pasaje> {

    public async findAll(): Promise<Pasaje[] | undefined> {
        const [pasajes] = await pool.query('SELECT * FROM pasaje');
        return pasajes as Pasaje[];
    }

    public async findOne(item: { id_vuelo: string; fecha_emision: string; id_pasaje: string; id_usuario: string }): Promise<Pasaje | undefined> {
        const { id_vuelo, fecha_emision, id_pasaje, id_usuario } = item;
        const [pasajes] = await pool.query<RowDataPacket[]>(
            'SELECT * FROM pasaje WHERE id_vuelo = ? AND fecha_emision = ? AND id_pasaje = ? AND id_usuario = ?',
            [id_vuelo, fecha_emision, id_pasaje, id_usuario]
        );
        return pasajes.length ? (pasajes[0] as Pasaje) : undefined;
    }

    public async add(pasajeInput: Pasaje): Promise<Pasaje | undefined> {
        const { id_pasaje, ...pasajeRow } = pasajeInput;
        const [result] = await pool.query<ResultSetHeader>('INSERT INTO pasaje SET ?', [pasajeRow]);
        pasajeInput.id_pasaje = result.insertId;
        return pasajeInput;
    }

    public async update(item: { id_vuelo: string; fecha_emision: string; id_pasaje: string; id_usuario: string }, pasaje: Pasaje): Promise<Pasaje | undefined> {
        const { id_vuelo, fecha_emision, id_pasaje, id_usuario } = item;
        const [result] = await pool.query<ResultSetHeader>(
            'UPDATE pasaje SET precio = ?, asiento = ?, clase = ? WHERE id_vuelo = ? AND fecha_emision = ? AND id_pasaje = ? AND id_usuario = ?',
            [pasaje.precio, pasaje.asiento, pasaje.clase, id_vuelo, fecha_emision, id_pasaje, id_usuario]
        );

        if (result.affectedRows === 0) {
            throw new Error('No se pudo actualizar el pasaje, ID no encontrado.');
        }

        return pasaje;
    }

    public async delete(item: { id_vuelo: string; fecha_emision: string; id_pasaje: string; id_usuario: string }): Promise<void> {
        const { id_vuelo, fecha_emision, id_pasaje, id_usuario } = item;
        const [result] = await pool.query<ResultSetHeader>(
            'DELETE FROM pasaje WHERE id_vuelo = ? AND fecha_emision = ? AND id_pasaje = ? AND id_usuario = ?',
            [id_vuelo, fecha_emision, id_pasaje, id_usuario]
        );

        if (result.affectedRows === 0) {
            throw new Error('No se pudo borrar el pasaje, ID no encontrado.');
        }
    }
}