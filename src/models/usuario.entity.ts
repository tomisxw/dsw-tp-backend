export class Usuario{
    constructor(
        public user: string,
        public fecha_registro: Date,
        public email: string,
        public rol: string, 
        public dni: string,
        public telefono: number, 
        public id_usuario?: number,
    ){}
}