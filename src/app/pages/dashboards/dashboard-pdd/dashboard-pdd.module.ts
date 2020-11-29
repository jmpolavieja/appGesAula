import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPddPageRoutingModule } from './dashboard-pdd-routing.module';

import { DashboardPddPage } from './dashboard-pdd.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        DashboardPddPageRoutingModule
    ],
  declarations: [DashboardPddPage]
})
export class DashboardPddPageModule {}
