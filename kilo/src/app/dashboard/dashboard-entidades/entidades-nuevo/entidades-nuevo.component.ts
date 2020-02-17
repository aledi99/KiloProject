import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { EntidadService } from '../../services/entidad.service';
import { EntidadDto } from '../../models/dto/entidad.dto';

@Component({
  selector: 'app-entidades-nuevo',
  templateUrl: './entidades-nuevo.component.html',
  styleUrls: ['./entidades-nuevo.component.scss']
})
export class EntidadesNuevoComponent implements OnInit {
  entidadDto: EntidadDto;

  constructor(public dialogRef: MatDialogRef<EntidadesNuevoComponent>,
    private entidadService: EntidadService) { }

  ngOnInit() {
    this.entidadDto = new EntidadDto('', '', 0, '');
  }

  guardarEntidad() {
    this.entidadService.createEntidad(this.entidadDto).then(respCorrecta => {
      this.dialogRef.close(true);
    }).catch(respError => {
      this.dialogRef.close(false);
    });
  }

  cerrar() {
    this.dialogRef.close(null);
  }

}
