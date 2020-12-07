import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {AulaInterface} from "../../../interfaces/aulaInterface";
import {AulasService} from "../../../services/data/aulas.service";

@Component({
  selector: 'app-list-aulas',
  templateUrl: './list-aulas.page.html',
  styleUrls: ['./list-aulas.page.scss'],
})
export class ListAulasPage implements OnInit {

  public aulas: Observable<AulaInterface[]>;

  constructor(private aulaService: AulasService ) { }

  ngOnInit() {
    this.aulas = this.aulaService.getAulas();
  }

}
