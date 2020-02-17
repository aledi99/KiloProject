import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EntidadService } from '../../services/entidad.service';
import { EntidadDto } from '../../models/dto/entidad.dto';

@Component({
  selector: 'app-entidades-editar',
  templateUrl: './entidades-editar.component.html',
  styleUrls: ['./entidades-editar.component.scss']
})
export class EntidadesEditarComponent implements OnInit {
  entidadDto: EntidadDto;

  constructor(public dialogRef: MatDialogRef<EntidadesEditarComponent>,
    private entidadService: EntidadService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.entidadDto = new EntidadDto(this.data.entidad.nombre,this.data.entidad.personal,this.data.entidad.telf, this.data.entidad.direccion);
  }

  editarEntidad() {
    this.entidadService.editEntidad(this.data.id, this.entidadDto).then(respCorrecta => {
      this.dialogRef.close(true);
    }).catch(respError => {
      this.dialogRef.close(false);
    });
  }

  cerrar() {
    this.dialogRef.close(null);
  }

}
