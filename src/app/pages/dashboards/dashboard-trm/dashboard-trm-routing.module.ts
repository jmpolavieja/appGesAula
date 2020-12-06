import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DashboardTrmPage} from './dashboard-trm.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardTrmPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardTrmPageRoutingModule {}
