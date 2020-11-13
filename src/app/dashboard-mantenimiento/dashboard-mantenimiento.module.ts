import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardMantenimientoPageRoutingModule } from './dashboard-mantenimiento-routing.module';

import { DashboardMantenimientoPage } from './dashboard-mantenimiento.page';
import {ComponentsModule} from "../components/components.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        DashboardMantenimientoPageRoutingModule,
        ComponentsModule
    ],
    declarations: [DashboardMantenimientoPage]
})
export class DashboardMantenimientoPageModule {}
