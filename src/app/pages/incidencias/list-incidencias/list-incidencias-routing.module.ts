import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListIncidenciasPage } from './list-incidencias.page';

const routes: Routes = [
  {
    path: '',
    component: ListIncidenciasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListIncidenciasPageRoutingModule {}
