import { Component, OnInit } from '@angular/core';
import {Aula} from "../../../models/aula";
import {AulasService} from "../../../services/data/aulas.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-detail-aula',
  templateUrl: './detail-aula.page.html',
  styleUrls: ['./detail-aula.page.scss'],
})
export class DetailAulaPage implements OnInit {

  public aula: Aula;

  constructor(
      private aulasService: AulasService,
      private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const idAula: string = this.route.snapshot.paramMap.get('id');
    this.aulasService.getAulaDetail(idAula).subscribe(aula =>{
      this.aula = aula;
    });

  }

}
