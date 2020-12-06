import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormCompletoPage } from './form-completo.page';

const routes: Routes = [
  {
    path: '',
    component: FormCompletoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormCompletoPageRoutingModule {}
