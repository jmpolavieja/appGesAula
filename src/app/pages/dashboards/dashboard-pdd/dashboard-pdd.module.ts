import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
/*import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';*/

import {DashboardPddPageRoutingModule} from './dashboard-pdd-routing.module';

import {DashboardPddPage} from './dashboard-pdd.page';
import {SharedModule} from "../../../shared/shared.module";

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        /*FormsModule,
        IonicModule,*/
        DashboardPddPageRoutingModule
    ],
  declarations: [DashboardPddPage]
})
export class DashboardPddPageModule {}
