import { Repository, RepositoryMantenimiento } from "../shared/repository.js";
import { Mantenimiento } from "../models/mantenimiento.entity";
import { pool } from "../shared/conn.mysql.js";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { format } from "date-fns";

export class MantenimientoRepository implements RepositoryMantenimiento<Mantenimiento> {

    public async findAll(): Promise<Mantenimiento[] | undefined> {
        const [mantenimientos] = await pool.query('SELECT * FROM mantenimiento');
        return mantenimientos as Mantenimiento[];
    }

    public async findOne(item: { id_mantenimiento: string; fecha: string; id_avion: string }): Promise<Mantenimiento | undefined> {
        const { id_mantenimiento, fecha, id_avion } = item;
        const [mantenimientos] = await pool.query<RowDataPacket[]>(
            'SELECT * FROM mantenimiento WHERE id_mantenimiento = ? AND fecha = ? AND id_avion = ?',
            [id_mantenimiento, fecha, id_avion]
        );
        return mantenimientos.length ? (mantenimientos[0] as Mantenimiento) : undefined;
    }

    public async add(mantenimientoInput: Mantenimiento): Promise<Mantenimiento | undefined> {
        const { id_mantenimiento, ...mantenimientoRow } = mantenimientoInput;
        const [result] = await pool.query<ResultSetHeader>('INSERT INTO mantenimiento SET ?', [mantenimientoRow]);
        mantenimientoInput.id_mantenimiento = result.insertId;
        return mantenimientoInput;
    }

    public async update(item: { id_mantenimiento: string; fecha: string; id_avion: string }, mantenimiento: Mantenimiento): Promise<Mantenimiento | undefined> {
        const formattedDate = format(new Date(item.fecha), 'yyyy-MM-dd');
        const { id_mantenimiento, fecha, id_avion } = item;
        const [result] = await pool.query<ResultSetHeader>(
            'UPDATE mantenimiento SET descripcion = ?, tipo = ? WHERE id_mantenimiento = ? AND fecha = ? AND id_avion = ?',
            [mantenimiento.descripcion, mantenimiento.tipo, id_mantenimiento, formattedDate, id_avion]
        );

        if (result.affectedRows === 0) {
            throw new Error('No se pudo actualizar el mantenimiento, ID no encontrado.');
        }

        return mantenimiento;
    }

    public async delete(item: { id_mantenimiento: string; fecha: string; id_avion: string }): Promise<void> {
        const { id_mantenimiento, fecha, id_avion } = item;
        const [result] = await pool.query<ResultSetHeader>(
            'DELETE FROM mantenimiento WHERE id_mantenimiento = ? AND fecha = ? AND id_avion = ?',
            [id_mantenimiento, fecha, id_avion]
        );

        if (result.affectedRows === 0) {
            throw new Error('No se pudo borrar el mantenimiento, ID no encontrado.');
        }
    }
}
