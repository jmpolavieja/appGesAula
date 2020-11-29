import { Component, OnInit } from '@angular/core';
import {UsersService} from "../../../services/data/users.service";
import {Observable} from "rxjs";
import {TotalesService} from "../../../services/data/totales.service";
import {TotalInterface} from "../../../models/totalInterface";
import {Router} from "@angular/router";
import {AuthenticateService} from "../../../services/auth/authenticate.service";

@Component({
  selector: 'app-dashboard-trm',
  templateUrl: './dashboard-trm.page.html',
  styleUrls: ['./dashboard-trm.page.scss'],
})
export class DashboardTrmPage implements OnInit {

  public totales: Observable<TotalInterface[]>;
  public primeraVez: boolean;

  constructor(
      private userService: UsersService,
      private totalService: TotalesService,
      private router: Router,
      private authService: AuthenticateService
  ) {this.primeraVez = true; }

  ngOnInit() {
    // Para que si no hay sesión activa se vuelva al login
    let uid = localStorage.getItem("UID");
    if(uid != null) {
      this.totales = this.totalService.getTotales();
    }else{
      this.router.navigate(['/login']);
    }
  }

  /*async setTotal() {
    this.totalService.setTotal('usuarios');
  }*/

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
}
