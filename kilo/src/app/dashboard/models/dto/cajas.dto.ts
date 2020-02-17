export class CajaDto {
    constructor(
        public numero: number,
        public tipoProducto: string,
        public cantidadTotal: number,
        public entidadAsociada: string,
        public idProducto: string,
        public idEntidad: string
    ) {}

    transformarDto() {
        return {
        numero: this.numero,
        tipoProducto: this.tipoProducto,
        cantidadTotal: this.cantidadTotal,
        entidadAsociada: this.entidadAsociada,
        idProducto: this.idProducto,
        idEntidad: this.idEntidad
        };
    }
}