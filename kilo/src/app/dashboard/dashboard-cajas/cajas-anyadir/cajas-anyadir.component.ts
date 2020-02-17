import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CajasService } from '../../services/cajas.service';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-cajas-anyadir',
  templateUrl: './cajas-anyadir.component.html',
  styleUrls: ['./cajas-anyadir.component.scss']
})
export class CajasAnyadirComponent implements OnInit {
  cantidad: 0;
  cantidadCambiar: number;
  cantidadProducto: number;
  suscripcion;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<CajasAnyadirComponent>, private productoService: ProductoService,  private cajaService: CajasService) {
    this.cantidad= 0;
    this.cantidadProducto= 0;
    this.cantidadCambiar= 0; }

  ngOnInit() {
  }

  anyadirCantidad() {
    let max = 9999;
    let cantidad2 = 0;
    this.suscripcion = this.productoService.findById(this.data.idProducto).subscribe(resp => {
      this.cantidadProducto = resp.payload.data().cantidad

      cantidad2 = this.cantidad;

      if (this.cantidad < 0) {
        cantidad2 = 0;
      }

      this.cantidadCambiar = Number(this.cantidadProducto) + Number(cantidad2)

      if (this.cantidadCambiar > 10000) {
        this.cantidadCambiar = max;
      }

      this.productoService.updateCantidad(this.cantidadCambiar, this.data.idProducto);

      this.cajaService.anyadirCantidad(this.data.id, this.data.cantidad, this.cantidad);

       this._parar();
       
  })
}

_parar() {
  this.suscripcion.unsubscribe();
}

  cerrar() {
    this.dialogRef.close(null);
  }

}
