import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
        DashboardPraPageModule
    ],
  declarations: [DetailAulaPage]
})
export class DetailAulaPageModule {}
