import {Component, OnInit} from '@angular/core';
// Importamos firebase para el control de usuario
import firebase from "firebase";
// Importamos servicios necesarios
import {UsersService} from "../../../services/data/users.service";
import {AuthService} from "../../../services/auth.service";
import {AulasService} from "../../../services/data/aulas.service";
import {TotalesService} from "../../../services/data/totales.service";
import {EquiposService} from "../../../services/data/equipos.service";
import {NotificacionesService} from "../../../services/data/notificaciones.service";
// Importaciones de librerías angular-ionic
import {Observable} from "rxjs";
import {BarcodeScanner} from "@ionic-native/barcode-scanner/ngx";
import {Router} from "@angular/router";
import {ToastController} from "@ionic/angular";
// Importaciones de interfaces necesarias
import {NotificacionInterface} from "../../../interfaces/notificacionInterface";
import {UsuarioInterface} from "../../../interfaces/usuarioInterface";

@Component({
  selector: 'app-dashboard-pra',
  templateUrl: './dashboard-pra.page.html',
  styleUrls: ['./dashboard-pra.page.scss'],
})
export class DashboardPraPage implements OnInit {
  // Propiedades
  public num: number;
  public numInc: number;
  public name: String;
  private user: Observable<firebase.User | null>;
  public idAula: string = "";
  public totalEquipos: any = 0;
  public notificaciones: NotificacionInterface[];
  private usuario: UsuarioInterface;

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private aulasService: AulasService,
    private equiposSer: EquiposService,
    private notifService: NotificacionesService,
    private barcodeScanner: BarcodeScanner,
    private totSer: TotalesService,
    private router: Router,
    private coastCtrl: ToastController
  ) {
  }

  ngOnInit() {
    // Comprobación de usuario actual - seguridad de acceso
    this.user = this.authService.currentUser;
    this.user.subscribe((user) => {
      // Si no hay sesión de usuario, se vuelve al login
      if (user) {
        console.log(user.email);
        let email = user.email;
        this.usersService.getUser(email).subscribe(
          usuario => {
            console.log("pra userServide: ", usuario.rol);
            this.usuario = usuario;
            if (this.usuario.rol == 'pra') {
              this.name = usuario.nombre;
              this.idAula = usuario.aula;
              // Buscar totales del aula
              this.aulasService.getAulaDetail(this.idAula)
                .subscribe((aula) => {
                  this.totalEquipos = aula.equipos;
                  this.numInc = aula.incidencias;
                });
              this.notifService.getNotificaciones(this.idAula).subscribe(
                nots => {
                  this.notificaciones = nots;
                }
              );
            } else if (this.usuario.rol == 'trm') {
              this.router.navigateByUrl('/trm');
            } else if (this.usuario.rol == 'pdd') {
              this.router.navigateByUrl('/pdd');
            } else {
              this.router.navigateByUrl('/login');
            }
          })
      }
    });
  }

  logout() {
    // Cerrar la sesión y volver a login
    this.authService.logoutUser();
    this.router.navigate([('/login')]);
  }

  scan() {
    // Búsqueda de equipos por código qr
    this.barcodeScanner.scan().then(barcodeData => {
      const idEquipo = barcodeData.text;

      if (idEquipo.substring(0, 2) == "CPU") {
        this.presentToast(idEquipo);
        this.router.navigateByUrl('/form-completo/' + idEquipo);
      } else {
        this.presentToast("Debe leer un código qr de equipo");
      }
    }).catch(err => {
      console.log('Error ', err);
    });
  }

  leido(not: NotificacionInterface) {
    not.leida = true;
    this.notifService.marcarLeida(not);
  }

  async presentToast(idEquipo) {
    const toast = await this.coastCtrl.create({
      message: 'Equipo leído: ' + idEquipo,
      duration: 2000
    });
    toast.present();
  }
}
