import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DashboardPddPage} from './dashboard-pdd.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPddPageRoutingModule {}
