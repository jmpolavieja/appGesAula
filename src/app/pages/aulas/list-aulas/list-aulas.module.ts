import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ListAulasPageRoutingModule} from './list-aulas-routing.module';

import {ListAulasPage} from './list-aulas.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ListAulasPageRoutingModule
    ],
  declarations: [ListAulasPage]
})
export class ListAulasPageModule {}
