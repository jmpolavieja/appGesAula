import { Component, OnInit } from '@angular/core';
import {IncidenciasService} from "../../../services/data/incidencias.service";
import {ActivatedRoute} from "@angular/router";
import {IncidenciaInterface} from "../../../models/incidenciaInterface";
import {FormBuilder} from "@angular/forms";
import {TotalInterface} from "../../../models/totalInterface";
import {TotalesService} from "../../../services/data/totales.service";
import {NotificacionesService} from "../../../services/data/notificaciones.service";
import {NotificacionInterface} from "../../../models/notificacionInterface";
import {Observable} from "rxjs";

@Component({
  selector: 'app-detail-incidencia',
  templateUrl: './detail-incidencia.page.html',
  styleUrls: ['./detail-incidencia.page.scss'],
})
export class DetailIncidenciaPage implements OnInit {

  public incidencia: IncidenciaInterface;
  public incidForm = this.fb.group({
    descripcion: [''],
    actuacion: ['']
  })
  total: TotalInterface;
  public notif: Observable<NotificacionInterface[]>;

  constructor(
      private incidService: IncidenciasService,
      private route: ActivatedRoute,
      private fb: FormBuilder,
      private totales: TotalesService,
      private notifS: NotificacionesService
  ) { }

  ngOnInit() {
    const idIncidencia: string = this.route.snapshot.paramMap.get('id');
    console.log(idIncidencia);
    this.incidService.getIncidenciaDetail(idIncidencia).subscribe(incidencia =>{
      this.incidencia = incidencia;
      this.incidForm.controls.descripcion.setValue(this.incidencia.descripcion);
      this.incidForm.controls.actuacion.setValue(this.incidencia.actuacion);
    });

  }



  updateInci() {

  }

  async finalizar() {
    // Lo que se hace es crear una notificación para el Aula desde Taller

  }

  recogido() {

  }
}
