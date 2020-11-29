import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPraPageRoutingModule } from './dashboard-pra-routing.module';
import { DashboardPraPage } from "./dashboard-pra.page";



@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        DashboardPraPageRoutingModule
    ],
    exports: [

    ],
    declarations: [DashboardPraPage]
})
export class DashboardPraPageModule {}
