import { Component, OnInit } from '@angular/core';
import { CajasService } from '../../services/cajas.service';
import { FirestoreResponse } from '../../models/firestoreresponse.interface';
import { Caja } from '../../models/cajas.interface';
import { CajasNuevoComponent } from '../cajas-nuevo/cajas-nuevo.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { CajasAnyadirComponent } from '../cajas-anyadir/cajas-anyadir.component';
import { CajasRestarComponent } from '../cajas-restar/cajas-restar.component';
import { CajasEliminarComponent } from '../cajas-eliminar/cajas-eliminar.component';

@Component({
  selector: 'app-cajas',
  templateUrl: './cajas.component.html',
  styleUrls: ['./cajas.component.scss']
})
export class CajasComponent implements OnInit {
  listadoCajas: FirestoreResponse<Caja>[];
  displayedColumns: string[] = ['numero', 'tipoProducto', 'cantidadTotal', 'entidadAsociada', 'acciones'];

  constructor(private cajaService: CajasService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loadCajas();
  }

  loadCajas() {
    this.cajaService.getCajas().subscribe(resp => {
      this.listadoCajas = [];

      resp.forEach((producto: any) => {
        this.listadoCajas.push({ 
          id: producto.payload.doc.id, 
          data: producto.payload.doc.data() as Caja
        });
      });
      
    });
  }

  dialogNuevaCaja() {
    let dialogRef = this.dialog.open(CajasNuevoComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(resp => {
      if(resp != null) {
        if(resp) {
          this.snackBar.open("Caja creada correctamente.", );
        } else {
          this.snackBar.open("Error al crear la caja.");
        }
      }
    });
  }

  dialogAnyadirCantidad(theId: string, theCantidad: number, theIdProducto: string) {
    let dialogRef = this.dialog.open(CajasAnyadirComponent, {
      data: {id: theId, cantidad: theCantidad, idProducto: theIdProducto},
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(resp => {
      if(resp != null) {
        if(resp) {
          this.snackBar.open("Cantidad añadida correctamente.", );
        } else {
          this.snackBar.open("Error al añadir la cantidad.", );
        }
      }
    });
  }

  dialogRestarCantidad(theId: string, theCantidad: number, theIdProducto: number) {
    let dialogRef = this.dialog.open(CajasRestarComponent, {
      data: {id: theId, cantidad: theCantidad, idProducto: theIdProducto},
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(resp => {
      if(resp != null) {
        if(resp) {
          this.snackBar.open("Cantidad restada correctamente.", );
        } else {
          this.snackBar.open("Error al restar la cantidad.");
        }
      }
    });
  }

  dialogBorrarCaja(id: string, theCantidad: number, theIdProducto: string) {
    let dialogRef = this.dialog.open(CajasEliminarComponent, {
      width: '300px',
      data: { 
        id: id,
        cantidad: theCantidad,
        idProducto: theIdProducto
      }
    });

    dialogRef.afterClosed().subscribe(resp => {
      if(resp != null) {
        if(resp) {
          this.snackBar.open("Entidad borrada correctamente.",);
        } else {
          this.snackBar.open("Error al borrar la entidad.");
        }
      }
    });
  }

}
