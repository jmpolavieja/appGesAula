import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListAulaPage } from './list-aula.page';

const routes: Routes = [
  {
    path: '',
    component: ListAulaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListAulaPageRoutingModule {}
