import { Component, OnInit } from '@angular/core';
import { CajasService } from '../../services/cajas.service';
import { CajaDto } from '../../models/dto/cajas.dto';
import { MatDialogRef } from '@angular/material';
import { FirestoreResponse } from '../../models/firestoreresponse.interface';
import { Caja } from '../../models/cajas.interface';
import { Producto } from '../../models/producto.interface';
import { Entidad } from '../../models/entidad.interface';
import { ProductoService } from '../../services/producto.service';
import { EntidadService } from '../../services/entidad.service';

@Component({
  selector: 'app-cajas-nuevo',
  templateUrl: './cajas-nuevo.component.html',
  styleUrls: ['./cajas-nuevo.component.scss']
})
export class CajasNuevoComponent implements OnInit {
  total: number
  cantidadProducto: number
  suscripcion;
  listadoProductos: FirestoreResponse<Producto>[];
  listadoEntidades: FirestoreResponse<Entidad>[];
  listadoCajas: FirestoreResponse<Caja>[];
  cajaDto: CajaDto;
  constructor(private cajaService: CajasService,
     public dialogRef: MatDialogRef<CajasNuevoComponent>,
      private productoService: ProductoService,
      private entidadService: EntidadService) 
      {
        this.total = 0;
        this.cantidadProducto = 0;
        this.cajaDto = new CajaDto(0, '', 20, '', '', '');
       }

  ngOnInit() {
    this.getTotal();
    this.loadProductos();
    this.loadEntidades();
  }

  getTotal() {
    this.cajaService.getCajas().subscribe(resp => {
      resp.forEach((caja: any) => {
        this.total = Number(this.total) + 1
      });
  })
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

  guardarCaja() {
    let max = 9999;
    this.suscripcion = this.productoService.findById(this.cajaDto.idProducto).subscribe(resp => {
      this.cajaDto.tipoProducto = resp.payload.data().nombre;

      this.entidadService.findById(this.cajaDto.idEntidad).subscribe(resp2 => {
        this.cajaDto.entidadAsociada = resp2.payload.data().nombre;

        this.cantidadProducto = resp.payload.data().cantidad

        let cantidadIntroducir = Number(this.cajaDto.cantidadTotal) + Number(this.cantidadProducto)


      this.productoService.updateCantidad(cantidadIntroducir, this.cajaDto.idProducto);

        this.cajaService.createCaja(this.cajaDto).then(respCorrecta => {
          this.dialogRef.close(true);
        }).catch(respError => {
          this.dialogRef.close(false);
        });

        this._parar();
      });
    });
  }

  _parar() {
    this.suscripcion.unsubscribe();
  }

  cerrar() {
    this.dialogRef.close(null);
  }

}
