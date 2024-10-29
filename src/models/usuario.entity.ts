export class Usuario{
    constructor(
        public usuario: string,
        public fecha_registro: Date,
        public fecha_nacimiento: Date,
        public numero_pasaporte: number,
        public email: string,
        public rol: string,
        public dni: string,
        public telefono: number,
        public id_usuario?: number,
    ){}
}