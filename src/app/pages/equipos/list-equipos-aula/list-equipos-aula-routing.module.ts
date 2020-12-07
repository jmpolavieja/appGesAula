import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListEquiposAulaPage } from './list-equipos-aula.page';

const routes: Routes = [
  {
    path: '',
    component: ListEquiposAulaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListEquiposAulaPageRoutingModule {}
