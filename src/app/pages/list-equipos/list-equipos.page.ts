import { Component, OnInit } from '@angular/core';
import {FirestoreService} from "../../services/data/firestore.service";
import {Observable} from "rxjs";
import {Equipo} from "../../models/equipo";

@Component({
  selector: 'app-list-equipos',
  templateUrl: './list-equipos.page.html',
  styleUrls: ['./list-equipos.page.scss'],
})
export class ListEquiposPage implements OnInit {

  public equipos: Observable<Equipo[]>;

  constructor(private firestore: FirestoreService) { }

  ngOnInit() {
    this.equipos = this.firestore.getEquiposList();
  }

  ionViewWillLeave() {
    this.equipos.subscribe().unsubscribe();
  }
}
