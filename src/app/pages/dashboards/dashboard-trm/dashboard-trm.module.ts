import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardTrmPageRoutingModule } from './dashboard-trm-routing.module';
import { DashboardTrmPage } from "./dashboard-trm.page";



@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        DashboardTrmPageRoutingModule
    ],
    exports: [],
    declarations: [
        DashboardTrmPage
    ]
})
export class DashboardTrmPageModule {}
