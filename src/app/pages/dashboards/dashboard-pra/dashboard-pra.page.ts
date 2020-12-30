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
import {AlertController, ToastController} from "@ionic/angular";
// Importaciones de interfaces necesarias
import {NotificacionInterface} from "../../../interfaces/notificacionInterface";
import {UsuarioInterface} from "../../../interfaces/usuarioInterface";
import {LoaderService} from "../../../services/loader.service";
import {PuestosService} from "../../../services/data/puestos.service";

@Component({
  selector: 'app-dashboard-pra',
  templateUrl: './dashboard-pra.page.html',
  styleUrls: ['./dashboard-pra.page.scss'],
})
export class DashboardPraPage implements OnInit {

  // Propiedades

  public numInc: number;
  public name: String;
  private user: Observable<firebase.User | null>;
  public idAula: string = "";
  public totalEquipos: any = 0;
  public notificaciones: NotificacionInterface[];
  private usuario: UsuarioInterface;
  private puestosExist: number;

  // En el constructor inyectamos los servicios necesarios
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private aulasService: AulasService,
    private equiposSer: EquiposService,
    private notifService: NotificacionesService,
    private puestosService: PuestosService,
    private barcodeScanner: BarcodeScanner,
    private totSer: TotalesService,
    private router: Router,
    private toastCtrl: ToastController,
    private loader: LoaderService,
    private alertCtrl: AlertController
  ) {
  }

  ngOnInit() {
    // Mostrar el loader
    this.loader.showLoader();
    // Comprobación de usuario actual - seguridad de acceso
    this.user = this.authService.currentUser;
    this.user.subscribe((user) => {
      this.loader.hideLoader();
      // Si no hay sesión de usuario, se vuelve al login
      if (user) {
        this.usersService.getUser(user.email).subscribe(
          usuario => {
            this.usuario = usuario;
            if (this.usuario.rol == 'pra') {
              this.name = usuario.nombre;
              this.idAula = usuario.aula;
              // Buscar totales del aula
              this.aulasService.getAulaDetail(this.idAula)
                .subscribe((aula) => {
                  // console.log(aula);
                  this.totalEquipos = aula.equipos;
                  this.numInc = aula.incidencias;
                });
              this.puestosService.existsPuestos(this.idAula)
                .then( res => {
                  console.log(res);
                  this.puestosExist = res;
                });
              this.notifService.getNotificaciones(this.idAula).subscribe(
                nots => {
                  this.notificaciones = nots;
                }
              );
            } else if (this.usuario.rol == 'trm') {
              this.router.navigateByUrl('/dashboard-trm');
            } else if (this.usuario.rol == 'pdd') {
              this.router.navigateByUrl('/dashboard-pdd');
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
    var data = null;
    this.barcodeScanner.scan().then(barcodeData => {
      data = barcodeData.text;

      if (data.substring(0, 3) == "CPU") {
        this.presentToast(data);
        this.router.navigateByUrl('/form-completo/' + data);
      } else {
        this.presentToast("Debe leer un código qr de equipo");
      }
    }).catch(() => {
      this.presentToast('Ha habido un error al leer el código, por favor inténtelo de nuevo.');
    });
  }

  // Control de lectura de notificaciones
  leido(not: NotificacionInterface) {
    not.leida = true;
    this.notifService.marcarLeida(not);
  }

  // Alert para pedir datos de configuración del aula: filas y columnas
  async configAula() {
    let alert = await this.alertCtrl.create({
      header: 'Setting Aula',
      inputs: [
        {
          name: 'filas',
          type: 'number',
          placeholder: 'filas'
        },
        {
          name: 'columnas',
          type: 'number',
          placeholder: 'columnas'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Guardar',
          handler: data=> {
            this.puestosService.setPuestos(this.idAula, data.filas, data.columnas);
            console.log('Has configurado el aula con ', data.filas, " filas y ", data.columnas, " columnas" );
          }
        }
      ]
    });
    await alert.present();
  }

  // Toast para mensajes
  async presentToast(mensaje) {
    const toast = await this.toastCtrl.create({
      message: 'Equipo leído: ' + mensaje,
      duration: 2000
    });
    toast.present();
  }
}
