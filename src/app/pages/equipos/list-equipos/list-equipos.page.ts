import {Component, OnInit} from '@angular/core';
import {EquiposService} from "../../../services/data/equipos.service";
import {EquipoInterface} from "../../../interfaces/equipoInterface";
import {ActionSheetController, AlertController} from "@ionic/angular";
import {ActivatedRoute, Router} from "@angular/router";
import {PuestosService} from "../../../services/data/puestos.service";
import {AulasService} from "../../../services/data/aulas.service";
import {AulaInterface} from "../../../interfaces/aulaInterface";
import {IncidenciasService} from "../../../services/data/incidencias.service";
import {IncidenciaInterface} from "../../../interfaces/incidenciaInterface";
import {NotificacionInterface} from "../../../interfaces/notificacionInterface";
import {NotificacionesService} from "../../../services/data/notificaciones.service";
import {TotalesService} from "../../../services/data/totales.service";

@Component({
  selector: 'app-list-equipos',
  templateUrl: './list-equipos.page.html',
  styleUrls: ['./list-equipos.page.scss'],
})
export class ListEquiposPage implements OnInit {

  public idAula: string;
  public equipos: EquipoInterface[];
  private aula: AulaInterface;
  private incidenciasAula: number;
  private totalIncidencias: number;
  filterTerm: string;

  constructor(private equiposService: EquiposService,
              private puestosService: PuestosService,
              private aulaService: AulasService,
              private incSer: IncidenciasService,
              private notiSer: NotificacionesService,
              private totalesService: TotalesService,
              public actionSheetController: ActionSheetController,
              private router: Router,
              private route: ActivatedRoute,
              private alertCtrl: AlertController
  ) {
  }


  ngOnInit() {
    // Si es un aula leo los equipos de la misma
    if (this.route.snapshot.paramMap.get('aula')) {
      this.idAula = this.route.snapshot.paramMap.get('aula');
      this.aulaService.getAulaDetail(this.idAula).subscribe(
        aula => {
          this.aula = aula;
        }
      )

      // console.log("tengo aula: ", this.idAula);
      this.equiposService.getEquiposList(this.idAula).subscribe(equipos => {
        this.equipos = equipos;
      });
      // Leer totales de incidencias en aulas y total de incidencias
      this.aulaService.getAulaDetail(this.idAula).subscribe(
        aula => {
          this.incidenciasAula = aula.incidencias;
          // console.log('Número de incidencias del aula leído', this.incidenciasAula);
        }
      )
      this.totalesService.getTotal('incidencias').subscribe(
        total => {
          this.totalIncidencias = total.total;
          // console.log('Total de indencias leído', this.totalIncidencias);
        }
      )
    } else {
      // si son todos los equipos, leo todos los equipos para mostrarlos
      this.equiposService.getAllEquipos().subscribe(equipos => {
        this.equipos = equipos;
      });
    }


  }
  // ActionSheet para el trm, con el menú de acciones
  async presentActionPra() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Aula',
      buttons: [
        {
          text: 'Asignación automática',
          icon: 'color-wand-outline',
          handler: () => {
            console.log('Asignación automática');
            this.asignacionAutomatica();
          }
        },
        {
          text: 'Asignación manual',
          icon: 'pencil-outline',
          handler: () => {
            console.log('Asignar Manual');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          icon: 'close',
          handler: () => {
            console.log("cancel clicked");
          }
        }
      ]
    });
    await actionSheet.present();
  }
  // ActionSheet para el pra, con las acciones accesibles por su parte
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Equipos',
      buttons: [
        {
          text: 'Genera Equipos',
          icon: 'qr-code',
          handler: () => {
            // console.log("Genera clicked");
            this.router.navigate(['/genera-equipos']);
          }
        },
        {
          text: 'Add Equipo',
          icon: 'add',
          handler: () => {
            this.router.navigateByUrl('/nuevo-equipo/true')
          }
        },
        {
          text: 'Asignar Equipos',
          icon: "settings",
          handler: () => {
            console.log("Asignar clicked");
            this.router.navigateByUrl('/asigna-equipos')
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          icon: 'close',
          handler: () => {
            console.log("cancel clicked");
          }
        }]
    });
    await actionSheet.present();
  }

  private asignacionAutomatica() {
    // Recorrer equipos y preparar array
    let equiposAsignacion: [{ idEquipo: string, asignado: boolean }?] = [];
    console.log("Equipos leidos: :", this.equipos);

    for (const equiposKey in this.equipos) {
      const idEquipo = this.equipos[equiposKey].idEquipo;
      console.log(idEquipo);
      var asignado: boolean;
      console.log(this.equipos[equiposKey].ubicacion.puesto);
      asignado = this.equipos[equiposKey].ubicacion.puesto != "";
      console.log(asignado);
      equiposAsignacion.push({idEquipo, asignado: asignado});
    }
    console.log("Equipos Asignación antes del envio: ", equiposAsignacion);
    this.puestosService.asignarEquipos(equiposAsignacion, this.idAula);

  }


  async alertIncidencia(idEquipo: string) {
    const alert = await this.alertCtrl.create({
      header: '¡Confirmar!',
      message: 'Va a crear una incidencia del equipo <i>' + idEquipo + '</i>, se generará una notificación a Mantenimiento, <strong>¿Quiere continuar?</strong>',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Ok',
          handler: () => {
            // Manejador para el ok, llamar a nueva incidencia
            this.generaIncidencia(idEquipo);
          }
        }
      ]
    });
    await alert.present();
  }

  generaIncidencia(idEquipo) {
    // Para llamar a nueva incidencia necesito: idEquipo, aula, fecha y profesor
    let data: IncidenciaInterface;
    let date = new Date();
    let options = {day: 'numeric', month: 'numeric', year: 'numeric'};
    let fecha = date.toLocaleString('es-ES', options);
    // para el id de la incidencia solo dia y mes
    let options2 = {day: 'numeric', month: 'numeric'};
    let diames = date.toLocaleString('es-ES', options2);
    if (diames.length == 4) {
      var n = 1, m = 4;
    } else {
      var n = 2, m = 5;
    }
    // Una vez que tengo todos los datos, creo el objeto incidencia
    let idIncidencia = idEquipo + "-" + diames.slice(0, n) + diames.slice(n + 1, m);
    data = {
      creadaPor: this.aula.pra,
      fechaInicio: fecha,
      idIncidencia: idIncidencia,
      idEquipo: idEquipo,
      recogida: false,
      aula: this.idAula
    }

    // uso el servicio para crear la incidencia,
    this.incSer.createIncidencia(data).then(
      () => {
        console.log('Incidencia creada exitosamente', idEquipo);
        // cuando es correcta, lanzo la notificación
        this.generaNotificacion(fecha, idIncidencia, idEquipo);
        // cambiar estado del equipo a incidencia
        this.equiposService.updateEstado('incidencia', idEquipo);
        // Actualizar totales
        this.totalIncidencias += 1;
        this.totalesService.updateElTotal(this.totalIncidencias, 'incidencias').then(() => {
            console.log('total incidencias actualizado');
          })
          .catch( () => {
              console.log('No he podido actualizar el total de incidencias');
            });
        console.log('Incidencias Aula ', this.incidenciasAula);
        this.incidenciasAula += 1;
        console.log("Actualizando incidencias del aula", this.aulaService.updateIncidenciasAula(this.incidenciasAula, this.idAula));
        // muestro detalle incidencia
        this.router.navigateByUrl('/detail-incidencia/' + data.idIncidencia + '/true');
      },
      error => {
        console.log(error);
      }
    );

  }

  private generaNotificacion(fecha: string, idIncidencia: string, idEquipo: string) {
    // Primero preparo la notificación
    let notificacion: NotificacionInterface;
    notificacion = {
      desde: this.idAula,
      fecha: fecha,
      idIncidencia: idIncidencia,
      leida: false,
      mensaje: "Nueva incidencia del equipo " + idEquipo,
      para: "taller",
      idNotificacion: idIncidencia+"-A"
    }
    // Ahora creas la notificación
    this.notiSer.createNotificacion(notificacion).then(() => {
      console.log('Notificacion creada correctamente');
    }, error => {
      console.error(error);
    });
  }
}
