export class ProductoDto {
    constructor(
        public nombre: string,
        public cantidad: number,
    ) {}

    transformarDto() {
        return {
        nombre: this.nombre,
        cantidad: this.cantidad
        };
    }
}