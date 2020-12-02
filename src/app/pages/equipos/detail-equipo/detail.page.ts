import { Component, OnInit } from '@angular/core';
import {EquipoInterface} from "../../../models/equipoInterface";
import {EquiposService} from "../../../services/data/equipos.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  public equipo: EquipoInterface;

  constructor(
      private equiposService: EquiposService,
      private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const idEquipo: string = this.route.snapshot.paramMap.get('id');
    this.equiposService.getEquipoDetail(idEquipo).subscribe(equipo =>{
      this.equipo = equipo;
    })
  }


}
