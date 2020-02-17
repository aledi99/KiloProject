import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { MatDialogRef } from '@angular/material';
import { ProductoDto } from '../../models/dto/producto.dto';

@Component({
  selector: 'app-productos-nuevo',
  templateUrl: './productos-nuevo.component.html',
  styleUrls: ['./productos-nuevo.component.scss']
})
export class ProductosNuevoComponent implements OnInit {
  productoDto: ProductoDto;

  constructor(public dialogRef: MatDialogRef<ProductosNuevoComponent>,
    private productoService: ProductoService) { }

  ngOnInit() {
    this.productoDto = new ProductoDto('', 0);
  }

  guardarProducto() {
    this.productoService.createProducto(this.productoDto).then(respCorrecta => {
      this.dialogRef.close(true);
    }).catch(respError => {
      this.dialogRef.close(false);
    });
  }

  cerrar() {
    this.dialogRef.close(null);
  }
}
