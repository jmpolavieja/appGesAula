import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewAulaPage } from './new-aula.page';

const routes: Routes = [
  {
    path: '',
    component: NewAulaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewAulaPageRoutingModule {}
