import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardProfesorPage } from './dashboard-profesor.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardProfesorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardProfesorPageRoutingModule {}
