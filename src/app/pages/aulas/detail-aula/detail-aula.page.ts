import {Component, OnInit} from '@angular/core';
import {AulaInterface} from "../../../interfaces/aulaInterface";
import {AulasService} from "../../../services/data/aulas.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {TotalInterface} from "../../../interfaces/totalInterface";
import {TotalesService} from "../../../services/data/totales.service";
import {AlertController} from "@ionic/angular";

@Component({
  selector: 'app-detail-aula',
  templateUrl: './detail-aula.page.html',
  styleUrls: ['./detail-aula.page.scss'],
})
export class DetailAulaPage implements OnInit {


  public aula: AulaInterface;
  public aulaForm = this.fb.group({
    idAula: ['', Validators.required],
    numEquipos: [0],
    departamento: ['', Validators.required],
    curso: ['', Validators.required]
  })
  titulo: any;
  nuevo: string;
  total: TotalInterface;

  constructor(
      private aulasService: AulasService,
      private route: ActivatedRoute,
      private fb: FormBuilder,
      private router: Router,
      private totalesService: TotalesService,
      public alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.nuevo = this.route.snapshot.paramMap.get('new');
    //console.log(this.nuevo);
    if(this.nuevo == "false"){
      this.titulo = "Detalle del Aula";

      const idAula = this.route.snapshot.paramMap.get('id');
      console.log("IdAula: " + idAula);
      this.aulasService.getAulaDetail(idAula).subscribe(aula =>{
        this.aula = aula;
        this.aulaForm.controls.numEquipos.setValue(this.aula.equipos | 0);
        this.aulaForm.controls.departamento.setValue(this.aula.departamento);
        this.aulaForm.controls.curso.setValue(this.aula.curso);
      });
    } else{
      this.titulo = "New Aula";
      this.totalesService.getOneTotal('aulas').subscribe(total =>{
        this.total =total;
      });
    }


  }

  guardarDatos() {
    // TODO: controlar, si es aula nueva, el id debe cargarse del formulario
    this.aula = this.aulaForm.value;
    if (this.nuevo == "true") {
      console.log("Nueva aula");
      this.guardarAula();
    }else{
      console.log("Modifica aula");
      console.log(this.aula);
      this.updateAula();
      this.router.navigateByUrl('/list-aulas');
    }
  }

  async guardarAula() {
    //const loading = await this.loadingCtrl.create();
    this.aulasService.addAula(this.aula)
        .then(()=>{
          // Aumentar el contador de aulas. Mirar nuevo usuario
          // navegar al dashboard
          this.updateTotal();
          this.router.navigateByUrl('/dashboard-trm');
        })
  }

  updateAula(): void{
    this.aulasService.updateAula(this.aula);
  }

  updateTotal(): void {
    this.total.total += 1;
    this.totalesService.updateTotal(this.total);
  }
}
