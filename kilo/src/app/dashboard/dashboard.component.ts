import { Component, OnInit } from '@angular/core';
import { ProductoService } from './services/producto.service';
import { EntidadService } from './services/entidad.service';
import { CajasService } from './services/cajas.service';
import { FirestoreResponse } from './models/firestoreresponse.interface';
import { Caja } from './models/cajas.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  total: number;
  totalCajas: number
  totalEntidades: number;
  totalKilogramos: number;
  listadoCajas: FirestoreResponse<Caja>[];

  constructor(private productoService: ProductoService, private entidadService: EntidadService, private cajaServicio: CajasService) {
    this.total= 0;
    this.totalEntidades = 0;
    this.totalCajas = 0;
    this.totalKilogramos = 0;
  }
  
  ngOnInit() {
    this.getTotal()
    this.getTotalCajas()
    this.getTotalEntidades()
    this.getTotalKilogramos()
  }

  getTotal() {
    this.productoService.getProductos().subscribe(resp => {
      resp.forEach((producto: any) => {
        this.total = Number(this.total) + 1
      });
  })
}

  getTotalEntidades() {
    this.entidadService.getEntidades().subscribe(resp => {
      resp.forEach((entidad: any) => {
        this.totalEntidades = Number(this.totalEntidades) + 1
      });
    })
  }


  getTotalCajas() {
    this.cajaServicio.getCajas().subscribe(resp => {
      resp.forEach((caja: any) => {
        this.totalCajas = Number(this.totalCajas) + 1
      });
    })
  }

  getTotalKilogramos() {
    this.cajaServicio.getCajas().subscribe(resp => {
      this.listadoCajas = [];

      resp.forEach((caja: any) => {
        this.listadoCajas.push({
          id: caja.payload.doc.id,
          data: caja.payload.doc.data() as Caja
        });
      });

      this.listadoCajas.forEach((caja: any) => {

        this.totalKilogramos = Number(this.totalKilogramos) + Number(caja.data.cantidadTotal);
  
      })
      
    });

  }
}
