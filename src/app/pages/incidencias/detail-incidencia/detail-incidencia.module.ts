import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailIncidenciaPageRoutingModule } from './detail-incidencia-routing.module';

import { DetailIncidenciaPage } from './detail-incidencia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailIncidenciaPageRoutingModule
  ],
  declarations: [DetailIncidenciaPage]
})
export class DetailIncidenciaPageModule {}
