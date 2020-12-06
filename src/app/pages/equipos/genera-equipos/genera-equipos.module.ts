import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalGeneraPageRoutingModule } from './genera-equipos-routing.module';

import { GeneraEquiposPage } from './genera-equipos.page';
import {SharedModule} from "../../../shared/shared.module";

@NgModule({
    imports: [
        CommonModule,
        ModalGeneraPageRoutingModule,
        SharedModule
    ],
  declarations: [GeneraEquiposPage]
})
export class GeneraEquiposPageModule {}
