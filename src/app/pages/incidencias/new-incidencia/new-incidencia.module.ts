import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
/*
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';
*/

import {NewIncidenciaPageRoutingModule} from './new-incidencia-routing.module';

import {NewIncidenciaPage} from './new-incidencia.page';
import {SharedModule} from "../../../shared/shared.module";

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        /*FormsModule,
        IonicModule,*/
        NewIncidenciaPageRoutingModule
    ],
    declarations: [NewIncidenciaPage]
})
export class NewIncidenciaPageModule {
}
