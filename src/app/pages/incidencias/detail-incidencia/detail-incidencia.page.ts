import { Component, OnInit } from '@angular/core';
import {IncidenciasService} from "../../../services/data/incidencias.service";
import {ActivatedRoute} from "@angular/router";
import {IncidenciaInterface} from "../../../models/incidenciaInterface";

@Component({
  selector: 'app-detail-incidencia',
  templateUrl: './detail-incidencia.page.html',
  styleUrls: ['./detail-incidencia.page.scss'],
})
export class DetailIncidenciaPage implements OnInit {
  private incidencia: IncidenciaInterface;

  constructor(
      private incidService: IncidenciasService,
      private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const idIncidencia: string = this.route.snapshot.paramMap.get('id');
    this.incidService.getIncidenciaDetail(idIncidencia).subscribe(incidencia =>{
      this.incidencia = incidencia;
    })
  }

}
