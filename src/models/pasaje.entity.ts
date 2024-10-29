export class Pasaje{
    constructor(
        public fecha_emision:Date,
        public precio: number,
        public asiento: string,
        public clase: string ,
        public id_vuelo:number ,
        public id_usuario:number ,
        public id_pasaje?: number 
    ){}
}