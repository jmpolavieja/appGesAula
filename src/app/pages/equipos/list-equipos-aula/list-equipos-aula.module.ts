import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListEquiposAulaPageRoutingModule } from './list-equipos-aula-routing.module';

import { ListEquiposAulaPage } from './list-equipos-aula.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListEquiposAulaPageRoutingModule
  ],
  declarations: [ListEquiposAulaPage]
})
export class ListEquiposAulaPageModule {}
