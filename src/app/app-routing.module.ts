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
    path: 'create',
    loadChildren: () => import('./pages/equipos/nuevo-equipo/create.module').then(m => m.CreatePageModule)
  },
  {
    path: 'detail-equipo/:id',
    loadChildren: () => import('./pages/equipos/detail-equipo/detail.module').then(m => m.DetailPageModule)
  },
  {
    path: 'dashboard-pra',
    loadChildren: () => import('./pages/dashboards/dashboard-pra/dashboard-pra.module').then(m => m.DashboardPraPageModule)
  },
  {
    path: 'dashboard-trm',
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
    path: 'detail-aula/:id',
    loadChildren: () => import('./pages/aulas/detail-aula/detail-aula.module').then( m => m.DetailAulaPageModule)
  },
  {
    path: 'new-aula',
    loadChildren: () => import('./pages/aulas/new-aula/new-aula.module').then( m => m.NewAulaPageModule)
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
    path: 'detail-user',
    loadChildren: () => import('./pages/users/detail-user/detail-user.module').then( m => m.DetailUserPageModule)
  },
  {
    path: 'new-user',
    loadChildren: () => import('./pages/users/new-user/new-user.module').then( m => m.NewUserPageModule)
  },
  {
    path: 'prueba',
    loadChildren: () => import('./pages/prueba/prueba.module').then( m => m.PruebaPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
