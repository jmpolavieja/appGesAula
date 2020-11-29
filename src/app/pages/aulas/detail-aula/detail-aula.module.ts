import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailAulaPageRoutingModule } from './detail-aula-routing.module';

import { DetailAulaPage } from './detail-aula.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        DetailAulaPageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [DetailAulaPage]
})
export class DetailAulaPageModule {}
