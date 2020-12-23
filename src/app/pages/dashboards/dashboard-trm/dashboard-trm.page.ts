import {Component, OnInit} from '@angular/core';
//Importamos nuestros servicios
import {UsersService} from "../../../services/data/users.service";
import {TotalesService} from "../../../services/data/totales.service";
import {NotificacionesService} from "../../../services/data/notificaciones.service";
import {AuthService} from "../../../services/auth.service";
// Importamos interfaces necesarias
import {TotalInterface} from "../../../interfaces/totalInterface";
import {UsuarioInterface} from "../../../interfaces/usuarioInterface";
import {NotificacionInterface} from "../../../interfaces/notificacionInterface";
// Otras importaciones (librerías, etc)
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {BarcodeScanner} from "@ionic-native/barcode-scanner/ngx";
import firebase from "firebase";
import {ToastController} from '@ionic/angular'
import {LoaderService} from "../../../services/loader.service";

@Component({
  selector: 'app-dashboard-trm',
  templateUrl: './dashboard-trm.page.html',
  styleUrls: ['./dashboard-trm.page.scss'],
})
export class DashboardTrmPage implements OnInit {

  // Declaración de prppiedades
  public totales: Observable<TotalInterface[]>;
  public primeraVez: boolean;
  public notificaciones: Observable<NotificacionInterface[]>;
  private notif: NotificacionInterface;
  public user: Observable<firebase.User | null>;
  public name: string;
  private usuario: UsuarioInterface;

  constructor(
    private userService: UsersService,
    private totalService: TotalesService,
    private router: Router,
    private authService: AuthService,
    private notifService: NotificacionesService,
    private barcodeScanner: BarcodeScanner,
    private toastCtrl: ToastController,
    private loader: LoaderService
  ) {
    this.primeraVez = true;
  }

  ngOnInit() {
    // Llamamos al loader
    this.loader.showLoader();
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
              this.loader.hideLoader();
              this.totales = this.totalService.getTotales();
              this.notificaciones = this.notifService.getNotificaciones('taller');
            } else if (this.usuario.rol == "pra") {
              this.router.navigateByUrl('/dashboard-pra');
            } else if (this.usuario.rol == 'pdd') {
              this.router.navigateByUrl('/dashboard-pdd');
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
    var data = null;
    this.barcodeScanner.scan().then(barcodeData => {
      // console.log("Equipo: ", barcodeData);
      data = barcodeData.text;
      if (data.substring(0,3) == "CPU"){
        this.presentToast('Equipo leído: ' + data);
        this.router.navigateByUrl('/detail-equipo/' + data + '/false');
      } else {
        this.presentToast('Debe escanear un código correcto.');
      }
      }).catch(err => {
      this.presentToast('Error ' + err);
    });
  }

  async presentToast(mensaje) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }
}
