import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailAulaPageRoutingModule } from './detail-aula-routing.module';

import { DetailAulaPage } from './detail-aula.page';
import {DashboardPraPageModule} from "../../dashboards/dashboard-pra/dashboard-pra.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        DetailAulaPageRoutingModule,
        DashboardPraPageModule,
        ReactiveFormsModule
    ],
  declarations: [DetailAulaPage]
})
export class DetailAulaPageModule {}
