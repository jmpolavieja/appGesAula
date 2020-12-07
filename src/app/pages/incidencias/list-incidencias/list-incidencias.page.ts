import {Component, OnInit} from '@angular/core';
import {IncidenciasService} from "../../../services/data/incidencias.service";
import {Observable} from "rxjs";
import {IncidenciaInterface} from "../../../interfaces/incidenciaInterface";
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-list-incidencias',
  templateUrl: './list-incidencias.page.html',
  styleUrls: ['./list-incidencias.page.scss'],
})
export class ListIncidenciasPage implements OnInit {

  public incidencias: Observable<IncidenciaInterface[]>;
  public inc: IncidenciaInterface[];

  constructor(private inciService: IncidenciasService,
              public modalDetalle: ModalController) { }

  ngOnInit() {
    this.incidencias = this.inciService.listIncNoFinalizadas();
  }
}
