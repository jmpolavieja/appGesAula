import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardTrmPageRoutingModule } from './dashboard-trm-routing.module';

import { DashboardTrmPage } from './dashboard-trm.page';
import {InfoCardComponent} from "../../components/info-card/info-card.component";
import {DashboardPraPageModule} from "../dashboard-pra/dashboard-pra.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        DashboardTrmPageRoutingModule,
        DashboardPraPageModule
    ],
    declarations: [DashboardTrmPage, InfoCardComponent]
})
export class DashboardTrmPageModule {}
