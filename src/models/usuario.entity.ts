export class Usuario{
    constructor(
        public usuario: string,
        public fecha_registro: Date,
        public fecha_nacimiento: Date,
        public numero_pasaporte: string,
        public email: string,
        public rol: string,
        public dni: number,
        public telefono: string,
        public id_usuario?: number,
    ){}
}