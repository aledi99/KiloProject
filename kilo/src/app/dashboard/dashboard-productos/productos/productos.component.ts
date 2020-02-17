import { Component, OnInit } from '@angular/core';
import { Producto } from '../../models/producto.interface';
import { FirestoreResponse } from '../../models/firestoreresponse.interface';
import { ProductoService } from '../../services/producto.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ProductosNuevoComponent } from '../productos-nuevo/productos-nuevo.component';
import { ProductosAnyadirComponent } from '../productos-anyadir/productos-anyadir.component';
import { ProductosEliminarComponent } from '../productos-eliminar/productos-eliminar.component';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  listadoProductos: FirestoreResponse<Producto>[];
  displayedColumns: string[] = ['nombre', 'cantidad'];

  constructor(private productoService: ProductoService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loadProductos();
  }

  loadProductos() {
    this.productoService.getProductos().subscribe(resp => {
      this.listadoProductos = [];

      resp.forEach((producto: any) => {
        this.listadoProductos.push({ 
          id: producto.payload.doc.id, 
          data: producto.payload.doc.data() as Producto
        });
      });
      
    });
  }

  dialogNuevoProducto() {
    let dialogRef = this.dialog.open(ProductosNuevoComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(resp => {
      if(resp != null) {
        if(resp) {
          this.snackBar.open("Producto creado correctamente.", );
        } else {
          this.snackBar.open("Error al crear el producto.");
        }
      }
    });
  }

  dialogAnyadirProducto(theId: string, theCantidad: number) {
    let dialogRef = this.dialog.open(ProductosAnyadirComponent, {
      data: {id: theId, cantidad: theCantidad},
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(resp => {
      if(resp != null) {
        if(resp) {
          this.snackBar.open("Cantidad añadida correctamente.", );
        } else {
          this.snackBar.open("Error al añadir la cantidad.",);
        }
      }
    });
  }

  dialogEliminarProducto(theId: string, theCantidad: number) {
    let dialogRef = this.dialog.open(ProductosEliminarComponent, {
      data: {id: theId, cantidad: theCantidad},
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(resp => {
      if(resp != null) {
        if(resp) {
          this.snackBar.open("Cantidad añadida correctamente.", );
        } else {
          this.snackBar.open("Error al añadir la cantidad.");
        }
      }
    });
  }

}
