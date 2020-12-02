import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailIncidenciaPageRoutingModule } from './detail-incidencia-routing.module';

import { DetailIncidenciaPage } from './detail-incidencia.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        DetailIncidenciaPageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [DetailIncidenciaPage]
})
export class DetailIncidenciaPageModule {}
