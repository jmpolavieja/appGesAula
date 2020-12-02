import { Component, OnInit } from '@angular/core';
import {UsersService} from "../../../services/data/users.service";
import {Observable} from "rxjs";
import {TotalesService} from "../../../services/data/totales.service";
import {TotalInterface} from "../../../models/totalInterface";
import {Router} from "@angular/router";
import {AuthenticateService} from "../../../services/auth/authenticate.service";
import {NotificacionesService} from "../../../services/data/notificaciones.service";
import {NotificacionInterface} from "../../../models/notificacionInterface";

@Component({
  selector: 'app-dashboard-trm',
  templateUrl: './dashboard-trm.page.html',
  styleUrls: ['./dashboard-trm.page.scss'],
})
export class DashboardTrmPage implements OnInit {

  public totales: Observable<TotalInterface[]>;
  public primeraVez: boolean;
  public notificaciones: Observable<NotificacionInterface[]>;
  private notif: NotificacionInterface;

  constructor(
      private userService: UsersService,
      private totalService: TotalesService,
      private router: Router,
      private authService: AuthenticateService,
      private notifService: NotificacionesService
  ) {this.primeraVez = true; }

  ngOnInit() {
    // Para que si no hay sesión activa se vuelva al login
    let uid = localStorage.getItem("UID");
    if(uid != null) {
      this.totales = this.totalService.getTotales();
      this.notificaciones = this.notifService.getNotificaciones('taller');
    }else{
      this.router.navigate(['/login']);
    }
  }

  irALista(docId: string) {
    this.primeraVez = false;
    switch (docId) {
      case "aulas":
        this.router.navigate(['/list-aulas']);
        break;
      case "equipos":
        this.router.navigate(['/list-equipos']);
        break;
      case "usuarios":
        this.router.navigate(['/user-list']);
        break;
      case "incidencias":
        this.router.navigate(['/list-incidencias']);
        break;
    }
  }

  logout() {
    this.authService.logoutUser();
    localStorage.clear();
    this.router.navigate(['/']);
  }

  notifLeida(not: NotificacionInterface) {
    // Marcar notificacion como leída y enviarle al detalle de la notificación
    this.notif = not;
    this.notif.leida = true;
    this.notifService.marcarLeida(this.notif);
  }
}
