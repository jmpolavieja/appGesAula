import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeneraEquiposPage } from './genera-equipos.page';

const routes: Routes = [
  {
    path: '',
    component: GeneraEquiposPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalGeneraPageRoutingModule {}
