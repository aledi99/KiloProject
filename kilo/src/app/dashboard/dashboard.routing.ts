import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { ProductosComponent } from './dashboard-productos/productos/productos.component';
import { EntidadesComponent } from './dashboard-entidades/entidades/entidades.component';
import { CajasComponent } from './dashboard-cajas/cajas/cajas.component';
import { EstadisticaEntidadComponent } from './dashboard-estadisticas/estadistica-entidad/estadistica-entidad.component';

export const DashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  { path: 'productos', component: ProductosComponent },
  { path: 'entidades', component: EntidadesComponent },
  { path: 'cajas', component: CajasComponent},
  { path: 'entidades/estadistica', component: EstadisticaEntidadComponent}
];
