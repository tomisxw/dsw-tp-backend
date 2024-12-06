export class Localidad{
    constructor(
        public nombre: string,
        public id_provincia: number,
        public id_localidad?: number
    ){}
}