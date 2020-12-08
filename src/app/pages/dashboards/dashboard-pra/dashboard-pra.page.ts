import {Component, OnInit} from '@angular/core';
import firebase from "firebase";
import {UsersService} from "../../../services/data/users.service";
import {AuthService} from "../../../services/auth.service";
import {Observable} from "rxjs";
import {AulasService} from "../../../services/data/aulas.service";
import {BarcodeScanner} from "@ionic-native/barcode-scanner/ngx";
import {Router} from "@angular/router";
import {TotalesService} from "../../../services/data/totales.service";
import {EquiposService} from "../../../services/data/equipos.service";
import {NotificacionesService} from "../../../services/data/notificaciones.service";
import {NotificacionInterface} from "../../../interfaces/notificacionInterface";
import {UsuarioInterface} from "../../../interfaces/usuarioInterface";

@Component({
  selector: 'app-dashboard-pra',
  templateUrl: './dashboard-pra.page.html',
  styleUrls: ['./dashboard-pra.page.scss'],
})
export class DashboardPraPage implements OnInit {

  public num = 30;
  public numInc = 2;
  private name: String;
  private data: any;
  private user: Observable<firebase.User | null>;
  private idAula: string = "";
  private totalEquipos: any = 0;
  private notificaciones: Observable<NotificacionInterface[]>;
  private usuario: UsuarioInterface;

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private aulasService: AulasService,
    private equiposSer: EquiposService,
    private notifService: NotificacionesService,
    private barcodeScanner: BarcodeScanner,
    private totSer: TotalesService,
    private router: Router
  ) {
  }

  ngOnInit() {
    // leer el nombre del usuario
    this.user = this.authService.currentUser;
    this.user.subscribe((user) => {
      if(user) {
        let email = user.email;
        this.usersService.getUser(email).subscribe(
          usuario => {
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
              this.notificaciones = this.notifService.getNotificaciones(this.idAula);
            } else {
              this.router.navigateByUrl('/login');
            }
          })
      } else {
        this.router.navigateByUrl('/login');
      }
    });
  }

  logout() {
    this.authService.logoutUser();
    this.router.navigate([('/login')]);
  }

  scan() {
    // TODO activar la búsqueda si es un idequipo
    this.data = null;
    this.barcodeScanner.scan().then(barcodeData => {
      console.log("Equipo: ", barcodeData);
      this.data = barcodeData;
    }).catch(err => {
      console.log('Error ', err);
    });
  }

  leido(not: NotificacionInterface) {
    not.leida = true;
    this.notifService.marcarLeida(not);
  }
}
