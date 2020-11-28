import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPddPageRoutingModule } from './dashboard-pdd-routing.module';

import { DashboardPddPage } from './dashboard-pdd.page';
import {DashboardPraPageModule} from "../dashboard-pra/dashboard-pra.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        DashboardPddPageRoutingModule,
        DashboardPraPageModule
    ],
  declarations: [DashboardPddPage]
})
export class DashboardPddPageModule {}
