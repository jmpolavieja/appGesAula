import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardDepartamentoPage } from './dashboard-departamento.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardDepartamentoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardDepartamentoPageRoutingModule {}
