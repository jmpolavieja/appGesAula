import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login2/login2.module').then( m => m.Login2PageModule)
  },
  {
    path: 'pra',
    loadChildren: () => import('./pages/dashboards/dashboard-pra/dashboard-pra.module').then(m => m.DashboardPraPageModule)
  },
  {
    path: 'trm',
    loadChildren: () => import('./pages/dashboards/dashboard-trm/dashboard-trm.module').then(m => m.DashboardTrmPageModule)
  },
  {
    path: 'pdd',
    loadChildren: () => import('./pages/dashboards/dashboard-pdd/dashboard-pdd.module').then( m => m.DashboardPddPageModule)
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
    path: 'list-equipos',
    loadChildren: () => import('./pages/equipos/list-equipos/list-equipos.module').then(m => m.ListEquiposPageModule)
  },
  {
    path: 'list-equipos/:aula',
    loadChildren: () => import('./pages/equipos/list-equipos/list-equipos.module').then(m => m.ListEquiposPageModule)
  },
  {
    path: 'list-aulas',
    loadChildren: () => import('./pages/aulas/list-aulas/list-aulas.module').then(m => m.ListAulasPageModule)
  },
  {
    path: 'detail-aula/:id/:new',
    loadChildren: () => import('./pages/aulas/detail-aula/detail-aula.module').then(m => m.DetailAulaPageModule)
  },
  {
    path: 'detail-aula/:new',
    loadChildren: () => import('./pages/aulas/detail-aula/detail-aula.module').then(m => m.DetailAulaPageModule)
  },
  {
    path: 'detail-incidencia/:id/:nueva',
    loadChildren: () => import('./pages/incidencias/detail-incidencia/detail-incidencia.module').then( m => m.DetailIncidenciaPageModule)
  },
  {
    path: 'list-incidencias/:aula',
    loadChildren: () => import('./pages/incidencias/list-incidencias/list-incidencias.module').then( m => m.ListIncidenciasPageModule)
  },
  {
    path: 'list-users',
    loadChildren: () => import('./pages/users/list-users/list-users.module').then(m => m.UserListPageModule)
  },
  {
    path: 'detail-user/:id/:nuevo',
    loadChildren: () => import('./pages/users/new-user/new-user.module').then(m => m.NewUserPageModule)
  },
  {
    path: 'new-user/:nuevo',
    loadChildren: () => import('./pages/users/new-user/new-user.module').then(m => m.NewUserPageModule)
  },
  {
    path: 'form-completo/:id',
    loadChildren: () => import('./pages/equipos/form-completo/form-completo.module').then( m => m.FormCompletoPageModule)
  },
  {
    path: 'genera-equipos',
    loadChildren: () => import('./pages/equipos/genera-equipos/genera-equipos.module').then(m => m.GeneraEquiposPageModule)
  },
  {
    path: 'asigna-equipos',
    loadChildren: () => import('./pages/equipos/asigna-equipos/asigna-equipos.module').then( m => m.AsignaEquiposPageModule)
  },
  {
    path: 'list-equipos-aula',
    loadChildren: () => import('./pages/equipos/list-equipos-aula/list-equipos-aula.module').then( m => m.ListEquiposAulaPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
