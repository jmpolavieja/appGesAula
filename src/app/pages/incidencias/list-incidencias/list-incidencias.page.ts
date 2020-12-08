import {Component, OnInit} from '@angular/core';
import {IncidenciasService} from "../../../services/data/incidencias.service";
import {Observable} from "rxjs";
import {IncidenciaInterface} from "../../../interfaces/incidenciaInterface";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-list-incidencias',
  templateUrl: './list-incidencias.page.html',
  styleUrls: ['./list-incidencias.page.scss'],
})
export class ListIncidenciasPage implements OnInit {

  public incidencias: Observable<IncidenciaInterface[]>;
  public inc: IncidenciaInterface[];
  private idAula: string;
  private nueva: string;

  constructor(
    private inciService: IncidenciasService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.idAula = this.route.snapshot.paramMap.get('aula');
    if (this.idAula == 'all') {
      this.incidencias = this.inciService.listIncNoFinalizadas();
      this.nueva = 'false';
    }else{
      this.incidencias = this.inciService.listIncAula(this.idAula);
      this.nueva = 'true';
    }

  }
}
