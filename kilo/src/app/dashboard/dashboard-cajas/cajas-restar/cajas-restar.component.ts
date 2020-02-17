import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CajasService } from '../../services/cajas.service';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-cajas-restar',
  templateUrl: './cajas-restar.component.html',
  styleUrls: ['./cajas-restar.component.scss']
})
export class CajasRestarComponent implements OnInit {
  cantidad: 0;
  cantidadCambiar: number;
  cantidadProducto: number;
  suscripcion;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private productoService: ProductoService, public dialogRef: MatDialogRef<CajasRestarComponent>,  private cajasService: CajasService) {
    this.cantidad= 0;
    this.cantidadProducto= 0;
    this.cantidadCambiar= 0;
   }

  ngOnInit() {
  }

  eliminarCantidad() {
    let min = this.cantidadProducto;
    this.suscripcion = this.productoService.findById(this.data.idProducto).subscribe(resp => {
      this.cantidadProducto = resp.payload.data().cantidad

      this.cantidadCambiar = Number(this.cantidadProducto) - Number(this.cantidad)

      if (this.cantidadProducto < this.cantidad) {
        this.cantidadCambiar = min;
      }

      this.productoService.updateCantidad(this.cantidadCambiar, this.data.idProducto);

      this.cajasService.eliminarCantidad(this.data.id, this.data.cantidad, this.cantidad);

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
