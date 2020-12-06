import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
/*
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';
*/

import {ListIncidenciasPageRoutingModule} from './list-incidencias-routing.module';

import {ListIncidenciasPage} from './list-incidencias.page';
import {SharedModule} from "../../../shared/shared.module";

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        /*FormsModule,
        IonicModule,*/
        ListIncidenciasPageRoutingModule
    ],
    declarations: [ListIncidenciasPage]
})
export class ListIncidenciasPageModule {
}
