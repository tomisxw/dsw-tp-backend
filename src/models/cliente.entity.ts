export class Cliente {
    constructor(
        public dni: string,
        public nombre: string,
        public apellido: string, 
        public edad: number, 
        public email: string, 
        public telefono: number, 
        public checkin: boolean
    ){}
}
