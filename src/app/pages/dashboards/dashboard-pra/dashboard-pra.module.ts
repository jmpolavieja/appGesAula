import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPraPageRoutingModule } from './dashboard-pra-routing.module';

import { DashboardPraPage } from './dashboard-pra.page';
import {ToolbarComponent} from "../../../components/toolbar/toolbar.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        DashboardPraPageRoutingModule
    ],
    exports: [
        ToolbarComponent
    ],
    declarations: [DashboardPraPage, ToolbarComponent]
})
export class DashboardPraPageModule {}
