export class Avion{
    constructor(
        public modelo:string,
        public capacidad_pasajeros: number,
        public fabrincante:string,
        public anio_fabricacion: Date ,
        public capacidad_kg:number ,
        public id_avion?: number 
    ){}
}