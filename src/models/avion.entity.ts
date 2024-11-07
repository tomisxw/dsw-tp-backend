export class Avion{
    constructor(
        public modelo:string,
        public capacidad_pasajeros: number,
        public fabricante:string,
        public anio_fabricacion: number ,
        public capacidad_kg:number ,
        public id_avion?: number 
    ){}
}