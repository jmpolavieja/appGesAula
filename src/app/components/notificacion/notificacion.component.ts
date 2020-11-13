import {Component, Input, OnInit} from '@angular/core';
import {Equipos} from "../../interfaces/equipos";
import {EQUIPOS} from '../../mock-equipos';

@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.component.html',
  styleUrls: ['./notificacion.component.scss'],
})
export class NotificacionComponent implements OnInit {

  equipos = EQUIPOS;

  constructor() { }

  ngOnInit() {}

}
