import { Component, OnInit } from '@angular/core';
import { FirestoreResponse } from '../../models/firestoreresponse.interface';
import { Entidad } from '../../models/entidad.interface';
import { EntidadService } from '../../services/entidad.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { EntidadesNuevoComponent } from '../entidades-nuevo/entidades-nuevo.component';
import { EntidadesEditarComponent } from '../entidades-editar/entidades-editar.component';
import { EntidadesEliminarComponent } from '../entidades-eliminar/entidades-eliminar.component';

@Component({
  selector: 'app-entidades',
  templateUrl: './entidades.component.html',
  styleUrls: ['./entidades.component.scss']
})
export class EntidadesComponent implements OnInit {
  listadoEntidades: FirestoreResponse<Entidad>[];
  displayedColumns: string[] = ['nombre', 'personal', 'telf', 'direccion', 'acciones'];

  constructor(private entidadService: EntidadService, public dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loadEntidades();
  }

  loadEntidades() {
    this.entidadService.getEntidades().subscribe(resp => {
      this.listadoEntidades = [];

      resp.forEach((entidad: any) => {
        this.listadoEntidades.push({ 
          id: entidad.payload.doc.id, 
          data: entidad.payload.doc.data() as Entidad
        });
      });
      
    });
  }

  dialogNuevaEntidad() {
    let dialogRef = this.dialog.open(EntidadesNuevoComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(resp => {
      if(resp != null) {
        if(resp) {
          this.snackBar.open("Entidad creada correctamente.", );
        } else {
          this.snackBar.open("Error al crear la entidad.");
        }
      }
    });
  }

  dialogEditarEntidad(id: string, entidadToEdit: Entidad) {
    let dialogRef = this.dialog.open(EntidadesEditarComponent, {
      width: '300px',
      data: { 
        id: id,
        entidad: entidadToEdit
      }
    });

    dialogRef.afterClosed().subscribe(resp => {
      if(resp != null) {
        if(resp) {
          this.snackBar.open("Entidad modificada correctamente.",);
        } else {
          this.snackBar.open("Error al modificar la entidad.");
        }
      }
    });
  }

  dialogEliminarEntidad(id: string) {
    let dialogRef = this.dialog.open(EntidadesEliminarComponent, {
      width: '300px',
      data: { 
        id: id,
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
