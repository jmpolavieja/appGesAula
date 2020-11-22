import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewAulaPageRoutingModule } from './new-aula-routing.module';

import { NewAulaPage } from './new-aula.page';
import {DashboardPraPageModule} from "../../dashboards/dashboard-pra/dashboard-pra.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        NewAulaPageRoutingModule,
        DashboardPraPageModule
    ],
  declarations: [NewAulaPage]
})
export class NewAulaPageModule {}
