export class EntidadDto {
    constructor(
        public nombre: string,
        public personal: string,
        public telf: number,
        public direccion: string
    ) {}

    transformarDto() {
        return {
        nombre: this.nombre,
        personal: this.personal,
        telf: this.telf,
        direccion: this.direccion
        };
    }
}