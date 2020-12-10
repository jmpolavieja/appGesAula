import {Component, OnInit} from '@angular/core';
import {UsersService} from "../../../services/data/users.service";
import {Observable} from "rxjs";
import {TotalesService} from "../../../services/data/totales.service";
import {TotalInterface} from "../../../interfaces/totalInterface";
import {Router} from "@angular/router";
import {NotificacionesService} from "../../../services/data/notificaciones.service";
import {NotificacionInterface} from "../../../interfaces/notificacionInterface";
import {BarcodeScanner} from "@ionic-native/barcode-scanner/ngx";
import {AuthService} from "../../../services/auth.service";
import firebase from "firebase";
import {UsuarioInterface} from "../../../interfaces/usuarioInterface";

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
  private data: any;
  public user: Observable<firebase.User | null>;
  public name: string;
  private usuario: UsuarioInterface;

  constructor(
    private userService: UsersService,
    private totalService: TotalesService,
    private router: Router,
    private authService: AuthService,
    private notifService: NotificacionesService,
    private barcodeScanner: BarcodeScanner
  ) {
    this.primeraVez = true;
  }

  ngOnInit() {
    // Para que si no hay sesión activa se vuelva al login
    this.user = this.authService.currentUser;
    this.user.subscribe((user) => {
      if (user) {
        console.log(user.email);
        let email = user.email;
        this.userService.getUser(email).subscribe(
          usuario => {
            this.usuario = usuario;
            this.name = this.usuario.nombre;
            if (this.usuario.rol == "trm") {
              this.totales = this.totalService.getTotales();
              this.notificaciones = this.notifService.getNotificaciones('taller');
            } else if (this.usuario.rol == "pra") {
              this.router.navigateByUrl('/pra');
            } else if (this.usuario.rol == 'pdd') {
              this.router.navigateByUrl('/pdd');
            } else {
              this.router.navigateByUrl('/login');
            }
          })
      }
    });
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
        this.router.navigate(['/list-users']);
        break;
      case "incidencias":
        this.router.navigate(['/list-incidencias/all']);
        break;
    }
  }

  logout() {
    this.authService.logoutUser();
    //localStorage.clear();
    this.router.navigate(['/login']);
  }

  notifLeida(not: NotificacionInterface) {
    // Marcar notificacion como leída y enviarle al detalle de la notificación
    this.notif = not;
    this.notif.leida = true;
    this.notifService.marcarLeida(this.notif);
  }

  scan() {
    // activar la búsqueda si es un idequipo
    this.data = null;
    this.barcodeScanner.scan().then(barcodeData => {
      console.log("Equipo: ", barcodeData);
      this.data = barcodeData.text;
      this.router.navigateByUrl('/detail-equipo/' + this.data + '/false');
    }).catch(err => {
      console.log('Error ', err);
    });
  }
}
