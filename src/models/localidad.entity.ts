export class Localidad{
    constructor(
        public nombre: string,
        public latitud: number,
        public longitud: number,
        public id_provincia: number,
        public id_localidad?: number
    ){}
}