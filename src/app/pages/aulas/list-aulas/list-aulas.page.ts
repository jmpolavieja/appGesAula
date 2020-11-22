import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Aula} from "../../../models/aula";
import {AulasService} from "../../../services/data/aulas.service";

@Component({
  selector: 'app-list-aulas',
  templateUrl: './list-aulas.page.html',
  styleUrls: ['./list-aulas.page.scss'],
})
export class ListAulasPage implements OnInit {

  public aulas: Observable<Aula[]>;

  constructor(private aulaService: AulasService ) { }

  ngOnInit() {
    this.aulas = this.aulaService.getAulas();
  }

}
