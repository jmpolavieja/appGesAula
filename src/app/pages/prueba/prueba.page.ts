import { Component, OnInit } from '@angular/core';
import {Prueba1Service} from "../../services/data/prueba1.service";
import {AlertController, LoadingController} from "@ionic/angular";

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.page.html',
  styleUrls: ['./prueba.page.scss'],
})
export class PruebaPage implements OnInit {

  constructor(public pruebaService: Prueba1Service,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController) { }

  ngOnInit() {

  }

  async createPrueba() {
    const loadingp = await this.loadingCtrl.create();

    const idP1 = "p2";
    const edad = "40";
    const nombre = "Juan";
    const rama = "mecanica";
    const titulo = "ingeniero";
    this.pruebaService.createPrueba(idP1, edad, nombre, rama, titulo)
        .then(() => {
              loadingp.dismiss().then(() => {
                console.log("prueba creada");
              });
            },
            error => {
              loadingp.dismiss().then(() => {
                console.error(error);
              });
            }
        );
  }
}
