import { Component, OnInit } from '@angular/core';
import {UsersService} from "../../services/data/users.service";
import {Observable} from "rxjs";
import {TotalesService} from "../../services/data/totales.service";
import {Total} from "../../models/total";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard-trm',
  templateUrl: './dashboard-trm.page.html',
  styleUrls: ['./dashboard-trm.page.scss'],
})
export class DashboardTrmPage implements OnInit {

  public totales: Observable<Total[]>;

  constructor(
      private userService: UsersService,
      private totalService: TotalesService,
      private router: Router
  ) { }

  ngOnInit() {
    this.totales = this.totalService.getTotales();
  }

  async setTotal() {
    this.totalService.setTotal('usuarios');
  }

  irALista(docId: string) {
    switch (docId) {
      case "aulas":
        break;
      case "equipos":
        this.router.navigate(['/list-equipos']);
        break;
      case "usuarios":
        break;
      case "incidencias":
        break;
    }
  }
}
