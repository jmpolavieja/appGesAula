import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormEquipoPage } from './form-equipo.page';

const routes: Routes = [
  {
    path: '',
    component: FormEquipoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreatePageRoutingModule {}
