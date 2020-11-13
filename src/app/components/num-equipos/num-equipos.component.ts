import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-num-equipos',
  templateUrl: './num-equipos.component.html',
  styleUrls: ['./num-equipos.component.scss'],
})
export class NumEquiposComponent implements OnInit {

  @Input('numero') numero: string;

  constructor() { }

  ngOnInit() {}

}
