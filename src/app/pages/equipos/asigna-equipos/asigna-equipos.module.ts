import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsignaEquiposPageRoutingModule } from './asigna-equipos-routing.module';

import { AsignaEquiposPage } from './asigna-equipos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsignaEquiposPageRoutingModule
  ],
  declarations: [AsignaEquiposPage]
})
export class AsignaEquiposPageModule {}
