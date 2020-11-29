import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


import { IonicModule } from '@ionic/angular';

import { CreatePageRoutingModule } from './form-equipo-routing.module';

import { FormEquipoPage } from './form-equipo.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CreatePageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [FormEquipoPage]
})
export class FormEquipoPageModule {}
