import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'dashboard-profesor',
    loadChildren: () => import('./dashboard-profesor/dashboard-profesor.module').then( m => m.DashboardProfesorPageModule)
  },
  {
    path: 'dashboard-mantenimiento',
    loadChildren: () => import('./dashboard-mantenimiento/dashboard-mantenimiento.module').then( m => m.DashboardMantenimientoPageModule)
  },
  {
    path: 'list-aula',
    loadChildren: () => import('./list-aula/list-aula.module').then( m => m.ListAulaPageModule)
  },
  {
    path: 'dashboard-departamento',
    loadChildren: () => import('./dashboard-departamento/dashboard-departamento.module').then( m => m.DashboardDepartamentoPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
