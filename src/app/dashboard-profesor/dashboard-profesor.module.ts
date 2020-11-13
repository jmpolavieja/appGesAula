import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardProfesorPageRoutingModule } from './dashboard-profesor-routing.module';

import { DashboardProfesorPage } from './dashboard-profesor.page';
import {ComponentsModule} from "../components/components.module";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardProfesorPageRoutingModule,
    ComponentsModule
  ],
  declarations: [DashboardProfesorPage]
})
export class DashboardProfesorPageModule {}
