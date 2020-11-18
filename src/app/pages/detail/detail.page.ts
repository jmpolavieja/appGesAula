import { Component, OnInit } from '@angular/core';
import {Equipo} from "../../models/equipo";
import {FirestoreService} from "../../services/data/firestore.service";
import {ActivatedRoute} from "@angular/router";
import {EquipoHardware} from "../../models/equipo-hardware";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  public equipo: EquipoHardware;

  constructor(
      private firestoreService: FirestoreService,
      private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const idEquipo: string = this.route.snapshot.paramMap.get('id');
    this.firestoreService.getEquipoDetail(idEquipo).subscribe(equipo =>{
      this.equipo = equipo;
    })
  }


}
