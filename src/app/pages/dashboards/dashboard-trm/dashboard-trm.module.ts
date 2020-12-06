import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

/*import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';*/

import {DashboardTrmPageRoutingModule} from './dashboard-trm-routing.module';
import {DashboardTrmPage} from "./dashboard-trm.page";
import {SharedModule} from "../../../shared/shared.module";


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        /*FormsModule,
        IonicModule,*/
        DashboardTrmPageRoutingModule
    ],
    exports: [],
    declarations: [
        DashboardTrmPage
    ]
})
export class DashboardTrmPageModule {}
