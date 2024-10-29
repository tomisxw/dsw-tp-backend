export class Vuelo{
    constructor(
        public numero_vuelo: number,
        public fecha_salida: Date,
        public fecha_llegada: Date,
        public estado: string,
        public id_avion: number,
        public id_aeropuerto_origen: number,
        public id_aeropuerto_destino: number,
        public id_vuelo?: number,
    ){}
}