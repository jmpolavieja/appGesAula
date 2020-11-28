import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AulaInterface} from "../../../models/aulaInterface";
import {TotalInterface} from "../../../models/totalInterface";
import {AulasService} from "../../../services/data/aulas.service";
import {AlertController, LoadingController} from "@ionic/angular";
import {Router} from "@angular/router";
import {TotalesService} from "../../../services/data/totales.service";

@Component({
  selector: 'app-new-aula',
  templateUrl: './new-aula.page.html',
  styleUrls: ['./new-aula.page.scss'],
})
export class NewAulaPage implements OnInit {

  newAula: FormGroup;
  aula: AulaInterface;
  total: TotalInterface;

  constructor(private aulaService: AulasService,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              private formBuilder: FormBuilder,
              private router: Router,
              private totalesService: TotalesService
  ) {
    this.newAula = formBuilder.group({
      idAula: ['', Validators.required],
      departamento: ['', Validators.required],
      curso: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.totalesService.getOneTotal('aulas').subscribe(total => {
      this.total = total;
    });
  }


  async guardarAula() {
    const loading = await this.loadingCtrl.create();
    const idAula = this.newAula.value.idAula;
    const departamento = this.newAula.value.departamento;
    const curso = this.newAula.value.curso;
    this.aula = {
      idAula: idAula,
      departamento: departamento,
      curso: curso
    }
    this.aulaService.addAula(this.aula)
        .then(()=>{
          // todo: Aumentar el contadorf de aulas. MIrar nuevo usuario
          // todo: navegar al dashboard
        })
  }
}
