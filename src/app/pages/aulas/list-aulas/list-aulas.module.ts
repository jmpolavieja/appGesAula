import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListAulasPageRoutingModule } from './list-aulas-routing.module';

import { ListAulasPage } from './list-aulas.page';
import {DashboardPraPageModule} from "../../dashboards/dashboard-pra/dashboard-pra.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ListAulasPageRoutingModule,
        DashboardPraPageModule
    ],
  declarations: [ListAulasPage]
})
export class ListAulasPageModule {}
