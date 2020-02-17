import { Component, OnInit } from '@angular/core';
import { Label, SingleDataSet, monkeyPatchChartJsTooltip, monkeyPatchChartJsLegend } from 'ng2-charts';
import { ChartType, ChartOptions } from 'chart.js';
import { CajasService } from '../../services/cajas.service';
import { EntidadService } from '../../services/entidad.service';

@Component({
  selector: 'app-estadistica-entidad',
  templateUrl: './estadistica-entidad.component.html',
  styleUrls: ['./estadistica-entidad.component.scss']
})
export class EstadisticaEntidadComponent implements OnInit {
  total: any;
  constructor(
    private cajaServicio: CajasService,
    private entidadServicio: EntidadService
  ) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  public etiquetasGraficaBarraKilosPorEntidad: Label[];
  public valoresGraficaBarraKilosPorEntidad: SingleDataSet[];
  graficaBarraKilosPorEntidadReady = false;

  public opcionesGraficaResponsiva: ChartOptions = {
    responsive: true,
  };
  public opcionesGraficaNoResponsiva: ChartOptions = {
    responsive: false,
  };
  public tipoGraficaTarta: ChartType = 'pie';
  public tipoGraficaBarra: ChartType = 'bar';
  public leyendaGraficaTrue = true;
  public leyendaGraficaFalse = false;
  public pluginsGraficaVoid = [];

  ngOnInit() {
    this.cargarDatosGraficaBarrasKilosPorEntidad();
  }

  cargarDatosGraficaBarrasKilosPorEntidad() {
    this.etiquetasGraficaBarraKilosPorEntidad = [];
    this.valoresGraficaBarraKilosPorEntidad = [];
    this.total = 0;
    console.log('Cargando entidades')
    this.entidadServicio.getValue().subscribe(resp => {

      resp.forEach((entidad: any) => {
        this.total = 0;
        this.etiquetasGraficaBarraKilosPorEntidad.push(entidad.nombre);
        this.cajaServicio.getByEntidad(entidad).subscribe(resp => {
          resp.forEach((caja: any) => {
            this.total += caja.cantidadTotal;
          });
          this.valoresGraficaBarraKilosPorEntidad.push(this.total);
        });
      });
      this.graficaBarraKilosPorEntidadReady = true;
    });
  }

}
