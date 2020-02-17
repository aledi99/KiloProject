import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatProgressBarModule,
  MatChipsModule,
  MatTableModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatDialogModule,
  MatCheckboxModule,
  MatSnackBarModule
} from '@angular/material';

import { ChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutes } from './dashboard.routing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AngularFireModule } from '@angular/fire';
import { RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ProductosComponent } from './dashboard-productos/productos/productos.component';
import { FormsModule } from '@angular/forms';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import {MatExpansionModule} from '@angular/material/expansion';
import { ProductosNuevoComponent } from './dashboard-productos/productos-nuevo/productos-nuevo.component';
import { ProductoService } from './services/producto.service';
import { ProductosAnyadirComponent } from './dashboard-productos/productos-anyadir/productos-anyadir.component';
import { ProductosEliminarComponent } from './dashboard-productos/productos-eliminar/productos-eliminar.component';
import { EntidadService } from './services/entidad.service';
import { EntidadesComponent } from './dashboard-entidades/entidades/entidades.component';
import { EntidadesNuevoComponent } from './dashboard-entidades/entidades-nuevo/entidades-nuevo.component';
import { EntidadesEditarComponent } from './dashboard-entidades/entidades-editar/entidades-editar.component';
import { EntidadesEliminarComponent } from './dashboard-entidades/entidades-eliminar/entidades-eliminar.component';
import { CajasNuevoComponent } from './dashboard-cajas/cajas-nuevo/cajas-nuevo.component';
import { CajasEliminarComponent } from './dashboard-cajas/cajas-eliminar/cajas-eliminar.component';
import { CajasAnyadirComponent } from './dashboard-cajas/cajas-anyadir/cajas-anyadir.component';
import { CajasRestarComponent } from './dashboard-cajas/cajas-restar/cajas-restar.component';
import { CajasService } from './services/cajas.service';
import { CajasComponent } from './dashboard-cajas/cajas/cajas.component';
import { EstadisticaEntidadComponent } from './dashboard-estadisticas/estadistica-entidad/estadistica-entidad.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DashboardRoutes),
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatListModule,
    MatProgressBarModule,
    MatMenuModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDialogModule,
    MatCheckboxModule,
    MatSnackBarModule,
    ChartsModule,
    FormsModule,
    NgxDatatableModule,
    MatExpansionModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  declarations: [DashboardComponent, ProductosComponent, EntidadesComponent, CajasComponent, ProductosNuevoComponent, ProductosAnyadirComponent, ProductosEliminarComponent, EntidadesNuevoComponent, EntidadesEditarComponent, EntidadesEliminarComponent, CajasNuevoComponent, CajasEliminarComponent, CajasAnyadirComponent, CajasRestarComponent, EstadisticaEntidadComponent],
  entryComponents: [ProductosNuevoComponent, ProductosAnyadirComponent, ProductosEliminarComponent, EntidadesNuevoComponent, EntidadesEditarComponent, EntidadesEliminarComponent, CajasNuevoComponent, CajasEliminarComponent, CajasAnyadirComponent, CajasRestarComponent],
  providers: [ProductoService, EntidadService, CajasService]
})
export class DashboardModule {}
