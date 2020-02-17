import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CajasService } from '../../services/cajas.service';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-cajas-eliminar',
  templateUrl: './cajas-eliminar.component.html',
  styleUrls: ['./cajas-eliminar.component.scss']
})
export class CajasEliminarComponent implements OnInit {
  cantidadCambiar: number;
  cantidadProducto: number;
  suscripcion;
  constructor(public dialogRef: MatDialogRef<CajasEliminarComponent>,
    private productoService: ProductoService,
    private cajasService: CajasService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.cantidadCambiar = 0;
    this.cantidadProducto = 0;
  }

  ngOnInit() {
  }

  deleteCaja() {
    let min = this.cantidadProducto;
    let cantidad2 = 0;
    this.suscripcion = this.productoService.findById(this.data.idProducto).subscribe(resp => {
      this.cantidadProducto = resp.payload.data().cantidad


      this.cantidadCambiar = Number(this.cantidadProducto) - Number(this.data.cantidad)

       if (this.cantidadProducto < this.data.cantidad) {
        this.cantidadCambiar = min;
      }

      if (this.cantidadCambiar > 10000) {
        this.cantidadCambiar = min;
      }

      this.productoService.updateCantidad(this.cantidadCambiar, this.data.idProducto);

      this.cajasService.deleteCaja(this.data.id).then(respCorrecta => {
        this.dialogRef.close(true);
      }).catch(respError => {
        this.dialogRef.close(false);
      });

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
