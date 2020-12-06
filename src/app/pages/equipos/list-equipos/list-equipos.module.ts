import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
/*import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';*/

import {ListEquiposPageRoutingModule} from './list-equipos-routing.module';

import {ListEquiposPage} from './list-equipos.page';
import {SharedModule} from "../../../shared/shared.module";

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        /*FormsModule,
        IonicModule,*/
        ListEquiposPageRoutingModule
    ],
  declarations: [ListEquiposPage]
})
export class ListEquiposPageModule {}
