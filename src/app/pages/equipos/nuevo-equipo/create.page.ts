import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AlertController, LoadingController} from "@ionic/angular";
import {FirestoreService} from "../../../services/data/firestore.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {Equipo} from "../../../models/equipo/equipo";
import validate = WebAssembly.validate;
import {Prueba1Service} from "../../../services/data/prueba1.service";
import {TotalesService} from "../../../services/data/totales.service";

@Component({
    selector: 'app-create',
    templateUrl: './create.page.html',
    styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
    createEquipoForm: FormGroup;
    equipo: Equipo;

    constructor(
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        private firestoreService: FirestoreService,
        formBuilder: FormBuilder,
        private router: Router,
        public totalesService: TotalesService
    ) {
        this.createEquipoForm = formBuilder.group({
            idEquipo: ['', Validators.required],
            marca: ['', Validators.required],
            modelo: ['', Validators.required],
            departamento: ['', Validators.required],
            aula: ['', Validators.required],
            monitor: [''],
            raton: [false, Validators.required],
            teclado: [false, Validators.required]
        });
    }

    ngOnInit() {
    }


    async createEquipo() {
        const loading = await this.loadingCtrl.create();
        const idEquipo = this.createEquipoForm.value.idEquipo;
        const marca = this.createEquipoForm.value.marca;
        const modelo = this.createEquipoForm.value.modelo;
        const departamento = this.createEquipoForm.value.departamento;
        const aula = this.createEquipoForm.value.aula;
        const monitor = this.createEquipoForm.value.monitor;
        const raton = this.createEquipoForm.value.raton;
        const teclado = this.createEquipoForm.value.teclado;

        this.equipo = {
            estado: "activo",
            idEquipo,
            hardware:{
                marca, modelo, procesador: "", memoria:"", discoDuro:"", numSerie:"", direccionMAC:"", monitor, raton, teclado
            },
            ubicacion: {
                aula, departamento, puesto:""
            }
        }

        this.firestoreService
            .createEquipo(this.equipo)
            .then(
                () => {
                    loading.dismiss().then(() => {
                        // aumentar el contador de equipos totales
                        // totalesService.setTotal()
                        this.router.navigateByUrl('/dashboard-trm');
                    });
                },
                error => {
                    loading.dismiss().then(() => {
                        console.error(error);
                    });
                }
            );

        return await loading.present();
    }


}
