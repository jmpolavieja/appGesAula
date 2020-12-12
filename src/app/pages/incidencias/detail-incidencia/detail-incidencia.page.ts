import {Component, OnInit} from '@angular/core';
import {IncidenciasService} from "../../../services/data/incidencias.service";
import {ActivatedRoute, Router} from "@angular/router";
import {IncidenciaInterface} from "../../../interfaces/incidenciaInterface";
import {FormBuilder, Validators} from "@angular/forms";
import {TotalInterface} from "../../../interfaces/totalInterface";
import {NotificacionInterface} from "../../../interfaces/notificacionInterface";
import {Observable} from "rxjs";
import {NotificacionesService} from "../../../services/data/notificaciones.service";
import {EquiposService} from "../../../services/data/equipos.service";
import {EquipoInterface} from "../../../interfaces/equipoInterface";
import {TotalesService} from "../../../services/data/totales.service";
import {AulasService} from "../../../services/data/aulas.service";

@Component({
  selector: 'app-detail-incidencia',
  templateUrl: './detail-incidencia.page.html',
  styleUrls: ['./detail-incidencia.page.scss'],
})
export class DetailIncidenciaPage implements OnInit {

  public incidencia: IncidenciaInterface;
  public incidForm = this.fb.group({
    descripcion: ['', [Validators.required]],
    actuacion: ['']
  })
  public total: TotalInterface;
  private incidenciasAula: number;
  public notif: Observable<NotificacionInterface[]>;
  public notificacion: NotificacionInterface;
  public bloquearF: boolean;
  public bloquearR: boolean;
  private equipo: EquipoInterface;
  public nueva: boolean;
  public idAula: string;

  constructor(
    private incidService: IncidenciasService,
    private notService: NotificacionesService,
    private equipoSer: EquiposService,
    private totalSer: TotalesService,
    private aulasSer: AulasService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit() {
    // Al iniciarse la página, se extrae el id de la ruta que corresponde al id de la incidencia
    const idIncidencia: string = this.route.snapshot.paramMap.get('id');
    // Si hay parámetro nueva en la ruta, ponemos el formulario en modo nueva incidencia para el pra
    if (this.route.snapshot.paramMap.get('nueva') == "true") {
      this.nueva = true;
    } else {
      this.nueva = false;
    }
    // Colocamos los valores y botones del formulario en función del valor de nueva, si true estamos iniciando desde pra una incidencia
    // si false, estamos editanto una incidencia desde trm
    this.incidService.getIncidenciaDetail(idIncidencia).subscribe(incidencia => {
      this.incidencia = incidencia;
      this.idAula = incidencia.aula;
      this.incidForm.controls.descripcion.setValue(this.incidencia.descripcion);
      this.incidForm.controls.actuacion.setValue(this.incidencia.actuacion);
      if (this.incidencia.fechaFin == "") {
        console.log(false);
        this.bloquearF = false;
        this.bloquearR = true;
      } else {
        this.bloquearF = true;
        this.bloquearR = false;
      }
      this.aulasSer.getAulaDetail(this.incidencia.aula).subscribe(aula => {
        this.incidenciasAula = aula.incidencias;
      });
    });
    this.totalSer.getOneTotal('incidencias').subscribe(total => {
      this.total = total;
    });
  }

  finalizar() {
    // Este método registra la actuación en una incidencia, guarda la fecha de finalización y envía una notificación
    // al pra que envió la incidencia.
    let date = new Date();
    let options = {day: 'numeric', month: 'numeric', year: 'numeric'};
    let fecha = date.toLocaleString('es-ES', options);
    // primero se actualiza la incidencia, fecha y actuación
    this.incidencia.fechaFin = fecha;
    this.incidencia.actuacion = this.incidForm.value.actuacion;
    console.log('Incidencia: ', this.incidencia);
    console.log(this.incidService.updateIncidencia(this.incidencia));
    // segundo se genera la notificación
    this.notificacion = {
      fecha: fecha,
      idIncidencia: this.incidencia.idIncidencia,
      desde: "taller",
      para: this.incidencia.aula,
      mensaje: 'Incidencia resuelta, puede recoger el equipo',
      leida: false,
      idNotificacion: this.incidencia.idIncidencia + "-T"
    };
    console.log("Notificacion: ", this.notificacion);
    this.notService.createNotificacion(this.notificacion).then(
      () => {
        console.log('Notificacion creada exitosamente!');
        this.router.navigateByUrl('/list-incidencias/all')
      }, (error) => {
        console.error(error);
      });
    // por último desbloqueamos el botón de finalizar
    this.bloquearF = true;
    this.bloquearR = false;
  }

  recogido() {
    // Aquí se actualiza los datos relacionados con la incidencia
    // Primero recoger el idEquipo para leer el equipo
    const idEquipo = this.incidencia.idEquipo;
    // Leer el id del equipo
    this.equipoSer.getEquipoDetail(idEquipo).subscribe(equipo => {
      this.equipo = equipo;
      this.equipo.estado = "asignado";
      // Ahora lo actualizo con el nuevo estado
      this.equipoSer.updateEquipo(this.equipo);
    });
    // Se resta 1 a totales incidencias
    this.updateTotal();
    // Se resta 1 de incidenicas del aula
    this.updateIncidenciasAula();
    // Se actualiza la incidencia a recogido = true.
    this.incidencia.recogida = true;
    this.incidService.updateIncidencia(this.incidencia);
    // TODO: Se termina la notificación correspondiente

    this.router.navigateByUrl('/list-equipos');
  }

  private updateTotal(): void {
    this.total.total -= 1;
    this.totalSer.updateTotal(this.total);
  }

  private updateIncidenciasAula(): void {
    this.incidenciasAula -= 1;
    this.aulasSer.updateIncidenciasAula(this.incidenciasAula, this.incidencia.aula);
  }

  enviar() {
    // Actualiza la incidencia
    this.incidencia.descripcion = this.incidForm.controls.descripcion.value;
    this.incidService.updateIncidencia(this.incidencia);
    //this.router.navigateByUrl('list-incidencias/')
  }
}
