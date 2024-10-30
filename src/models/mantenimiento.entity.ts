export class Mantenimiento {
    constructor(
        public id_mantenimiento: number,
        public fecha: Date,
        public id_avion: number,
        public descripcion: string,
        public tipo: string,
    ) {}
}
