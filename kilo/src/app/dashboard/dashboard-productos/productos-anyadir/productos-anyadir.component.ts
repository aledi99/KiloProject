import { Component, OnInit, Inject } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Producto } from '../../models/producto.interface';

@Component({
  selector: 'app-productos-anyadir',
  templateUrl: './productos-anyadir.component.html',
  styleUrls: ['./productos-anyadir.component.scss']
})
export class ProductosAnyadirComponent implements OnInit {
  cantidad: 0;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ProductosAnyadirComponent>,  private productoService: ProductoService) {
    this.cantidad= 0;
   }

  ngOnInit() {
  }

  anyadirCantidad() {
    this.productoService.anyadirCantidad(this.data.id, this.data.cantidad, this.cantidad);
  }

  cerrar() {
    this.dialogRef.close(null);
  }

}
