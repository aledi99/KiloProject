import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { EntidadService } from '../../services/entidad.service';

@Component({
  selector: 'app-entidades-eliminar',
  templateUrl: './entidades-eliminar.component.html',
  styleUrls: ['./entidades-eliminar.component.scss']
})
export class EntidadesEliminarComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EntidadesEliminarComponent>,
    private entidadService: EntidadService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  deleteEntidad() {
    this.entidadService.deleteEntidad(this.data.id).then(respCorrecta => {
      this.dialogRef.close(true);
    }).catch(respError => {
      this.dialogRef.close(false);
    });
  }

  cerrar() {
    this.dialogRef.close(null);
  }

}
