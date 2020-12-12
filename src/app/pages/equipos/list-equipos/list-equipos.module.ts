import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ListEquiposPageRoutingModule} from './list-equipos-routing.module';

import {ListEquiposPage} from './list-equipos.page';
import {Ng2SearchPipeModule} from "ng2-search-filter";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListEquiposPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [ListEquiposPage]
})
export class ListEquiposPageModule {
}
