import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {NewIncidenciaPage} from './new-incidencia.page';

const routes: Routes = [
  {
    path: '',
    component: NewIncidenciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewIncidenciaPageRoutingModule {}
