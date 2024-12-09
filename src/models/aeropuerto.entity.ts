export class Aeropuerto{
    constructor(
        public nombre: string,
        public capacidad_aviones: number,
        public numero_terminales: number,
        public id_localidad:      number,
        public id_aeropuerto?: number

    ){}
}