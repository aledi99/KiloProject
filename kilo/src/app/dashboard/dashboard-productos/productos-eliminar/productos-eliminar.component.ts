import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-productos-eliminar',
  templateUrl: './productos-eliminar.component.html',
  styleUrls: ['./productos-eliminar.component.scss']
})
export class ProductosEliminarComponent implements OnInit {
  cantidad: 0;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ProductosEliminarComponent>,  private productoService: ProductoService) {
    this.cantidad= 0;
   }

  ngOnInit() {
  }

  eliminarCantidad() {
    this.productoService.eliminarCantidad(this.data.id, this.data.cantidad, this.cantidad);
  }

  cerrar() {
    this.dialogRef.close(null);
  }
}
