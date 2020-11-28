import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuardService} from "./services/auth-guard.service";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'nuevo-equipo/:nuevo',
    loadChildren: () => import('./pages/equipos/form-equipo/form-equipo.module').then(m => m.FormEquipoPageModule)
  },
  {
    path: 'detail-equipo/:id/:nuevo',
    loadChildren: () => import('./pages/equipos/form-equipo/form-equipo.module').then(m => m.FormEquipoPageModule)
  },
  {
    path: 'dashboard-pra',
    loadChildren: () => import('./pages/dashboards/dashboard-pra/dashboard-pra.module').then(m => m.DashboardPraPageModule)
  },
  {
    path: 'dashboard-trm',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./pages/dashboards/dashboard-trm/dashboard-trm.module').then(m => m.DashboardTrmPageModule)
  },
  {
    path: 'user-list',
    loadChildren: () => import('./pages/users/user-list/user-list.module').then(m => m.UserListPageModule)
  },
  {
    path: 'list-equipos',
    loadChildren: () => import('./pages/equipos/list-equipos/list-equipos.module').then(m => m.ListEquiposPageModule)
  },
  {
    path: 'dashboard-pdd',
    loadChildren: () => import('./pages/dashboards/dashboard-pdd/dashboard-pdd.module').then( m => m.DashboardPddPageModule)
  },
  {
    path: 'list-aulas',
    loadChildren: () => import('./pages/aulas/list-aulas/list-aulas.module').then( m => m.ListAulasPageModule)
  },
  {
    path: 'detail-aula/:id/:new',
    loadChildren: () => import('./pages/aulas/detail-aula/detail-aula.module').then( m => m.DetailAulaPageModule)
  },
  {
    path: 'detail-aula/:new',
    loadChildren: () => import('./pages/aulas/detail-aula/detail-aula.module').then( m => m.DetailAulaPageModule)
  },
  {
    path: 'new-incidencia',
    loadChildren: () => import('./pages/incidencias/new-incidencia/new-incidencia.module').then( m => m.NewIncidenciaPageModule)
  },
  {
    path: 'detail-incidencia',
    loadChildren: () => import('./pages/incidencias/detail-incidencia/detail-incidencia.module').then( m => m.DetailIncidenciaPageModule)
  },
  {
    path: 'list-incidencias',
    loadChildren: () => import('./pages/incidencias/list-incidencias/list-incidencias.module').then( m => m.ListIncidenciasPageModule)
  },
  {
    path: 'detail-user/:id/:nuevo',
    loadChildren: () => import('./pages/users/new-user/new-user.module').then( m => m.NewUserPageModule)
  },
  {
    path: 'new-user/:nuevo',
    loadChildren: () => import('./pages/users/new-user/new-user.module').then( m => m.NewUserPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'login2',
    loadChildren: () => import('./pages/login2/login2.module').then( m => m.Login2PageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
