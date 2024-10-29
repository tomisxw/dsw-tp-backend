export class Mantenimiento {
    constructor(
        public descripcion: string,
        public fecha: Date,
        public id_avion: number,
        public tipo: string,
        public id_mantenimiento?: number,
    ) {}
}
