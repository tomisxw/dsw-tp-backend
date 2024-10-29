export interface Repository<T>{
    findAll(): Promise<T[] | undefined>
    findOne(item: {id: string }): Promise<T | undefined>
    add(item: T): Promise<T | undefined>
    update(id: string, item: T): Promise<T | undefined>
    delete(item: {id: string}): Promise<T | undefined>
}

export interface RepositoryMantenimiento<T> {
    findAll(): Promise<T[] | undefined>;
    findOne(item: { id_mantenimiento: string; fecha: string; id_avion: string }): Promise<T | undefined>;
    add(item: T): Promise<T | undefined>;
    update(item: { id_mantenimiento: string; fecha: string; id_avion: string }, updatedItem: T): Promise<T | undefined>;
    delete(item: { id_mantenimiento: string; fecha: string; id_avion: string }): Promise<void>;
}

export interface RepositoryPasaje<T> {
    findAll(): Promise<T[] | undefined>;
    findOne(item: { id_vuelo: string; fecha_emision: string; id_pasaje: string; id_usuario: string }): Promise<T | undefined>;
    add(item: T): Promise<T | undefined>;
    update(item: { id_vuelo: string; fecha_emision: string; id_pasaje: string; id_usuario: string }, updatedItem: T): Promise<T | undefined>;
    delete(item: { id_vuelo: string; fecha_emision: string; id_pasaje: string; id_usuario: string }): Promise<void>;
}
