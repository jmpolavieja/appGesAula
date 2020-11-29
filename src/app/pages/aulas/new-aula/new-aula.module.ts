import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewAulaPageRoutingModule } from './new-aula-routing.module';

import { NewAulaPage } from './new-aula.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        NewAulaPageRoutingModule
    ],
  declarations: [NewAulaPage]
})
export class NewAulaPageModule {}
