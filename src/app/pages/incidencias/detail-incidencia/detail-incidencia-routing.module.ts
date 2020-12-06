import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DetailIncidenciaPage} from './detail-incidencia.page';

const routes: Routes = [
  {
    path: '',
    component: DetailIncidenciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailIncidenciaPageRoutingModule {}
