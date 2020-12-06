import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormCompletoPageRoutingModule } from './form-completo-routing.module';

import { FormCompletoPage } from './form-completo.page';
import {SharedModule} from "../../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormCompletoPageRoutingModule
  ],
  declarations: [FormCompletoPage]
})
export class FormCompletoPageModule {}
