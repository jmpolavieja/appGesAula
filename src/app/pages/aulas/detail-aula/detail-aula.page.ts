import {Component, OnInit} from '@angular/core';
import {AulaInterface} from "../../../interfaces/aulaInterface";
import {AulasService} from "../../../services/data/aulas.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TotalInterface} from "../../../interfaces/totalInterface";
import {TotalesService} from "../../../services/data/totales.service";
import {AlertController} from "@ionic/angular";

@Component({
  selector: 'app-detail-aula',
  templateUrl: './detail-aula.page.html',
  styleUrls: ['./detail-aula.page.scss'],
})
export class DetailAulaPage implements OnInit {

  //  Propiedades.

  public aula: AulaInterface;
  public idAula: string;
  public aulaForm: FormGroup;
  public titulo: any;
  public nuevo: string;
  public total: TotalInterface;

  // En el constructor inyectamos los servicios

  constructor(
      private aulasService: AulasService,
      private route: ActivatedRoute,
      private fb: FormBuilder,
      private router: Router,
      private totalesService: TotalesService,
      public alertCtrl: AlertController
  ) {
    // Inicialización del formulario
    this.aulaForm = this.fb.group({
      idAula: ['', Validators.required],
      equipos: [0],
      departamento: ['', Validators.required],
      curso: ['', Validators.required]
    })
  }


  ngOnInit() {
    // Al cargar la página, primero leo el parámetros new de la URL
    this.nuevo = this.route.snapshot.paramMap.get('new');
    // Si el parámetro new es false, muestro el formulario para modificar el aula
    if(this.nuevo == "false"){
      this.titulo = "Detalle del Aula";
      const idAula = this.route.snapshot.paramMap.get('id');
      //console.log("IdAula: " + idAula);
      this.aulasService.getAulaDetail(idAula).subscribe(aula =>{
        this.aula = aula;
        this.idAula = aula.idAula;
        this.aulaForm.controls.equipos.setValue(this.aula.equipos | 0);
        this.aulaForm.controls.departamento.setValue(this.aula.departamento);
        this.aulaForm.controls.curso.setValue(this.aula.curso);
      });
    } else {
      // Si el parámetro new es true, muestro el formulario para nueva aula
      this.titulo = "New Aula";
      this.totalesService.getOneTotal('aulas').subscribe(total =>{
        this.total =total;
      });
    }
  }

  guardarDatos() {
    // controlar, si es aula nueva, el id debe cargarse del formulario
    this.aula = this.aulaForm.value;
    if (this.nuevo == "true") {
      this.guardarAula();
    }else{
      this.aula.idAula = this.idAula;
      this.updateAula();
      this.router.navigateByUrl('/list-aulas');
    }
  }

  async guardarAula() {
    //const loading = await this.loadingCtrl.create();
    this.aulasService.addAula(this.aula)
        .then(()=>{
          // Aumentar el contador de aulas.
          this.updateTotal();
          this.router.navigateByUrl('/list-aulas');
        })
  }

  updateAula(): void{
    console.log(this.aula);
    this.aulasService.updateAula(this.aula);
  }

  updateTotal(): void {
    this.total.total += 1;
    this.totalesService.updateTotal(this.total);
  }
}
