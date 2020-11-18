import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListEquiposPage } from './list-equipos.page';

const routes: Routes = [
  {
    path: '',
    component: ListEquiposPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListEquiposPageRoutingModule {}
