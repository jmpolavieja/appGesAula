import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {FormEquipoPage} from './form-equipo.page';

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
