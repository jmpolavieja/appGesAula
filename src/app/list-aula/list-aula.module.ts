import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListAulaPageRoutingModule } from './list-aula-routing.module';

import { ListAulaPage } from './list-aula.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListAulaPageRoutingModule
  ],
  declarations: [ListAulaPage]
})
export class ListAulaPageModule {}
