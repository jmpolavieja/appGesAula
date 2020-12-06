import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
/*import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';*/

import {Login2PageRoutingModule} from './login2-routing.module';

import {Login2Page} from './login2.page';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        /*FormsModule,
        ReactiveFormsModule,
        IonicModule,*/
        Login2PageRoutingModule
    ],
    declarations: [Login2Page]
})
export class Login2PageModule {
}
