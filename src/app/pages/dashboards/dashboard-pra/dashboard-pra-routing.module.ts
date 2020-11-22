import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPraPage } from './dashboard-pra.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPraPageRoutingModule {}