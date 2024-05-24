export class Vuelo {
    constructor(
        public codigo: string,
        public aerolinea: string, 
        public estado: string, 
        public duracion: string, 
        public cupo: number, 
        public disponibilidad: boolean
    ){}
}
