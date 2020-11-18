import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AlertController, LoadingController} from "@ionic/angular";
import {FirestoreService} from "../../services/data/firestore.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {Equipo} from "../../models/equipo";
import validate = WebAssembly.validate;

@Component({
    selector: 'app-create',
    templateUrl: './create.page.html',
    styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
    createEquipoForm: FormGroup;

    constructor(
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        private firestoreService: FirestoreService,
        formBuilder: FormBuilder,
        private router: Router
    ) {
        this.createEquipoForm = formBuilder.group({
            idEquipo: ['', Validators.required],
            marca: ['', Validators.required],
            modelo: ['', Validators.required],
            cpu: ['', Validators.required],
            hdd: ['', Validators.required],
            ram: ['', Validators.required],
            mac: [''],
            numSerie: [''],
            monitor: ['', Validators.required],
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
        const cpu = this.createEquipoForm.value.cpu;
        const hdd = this.createEquipoForm.value.hdd;
        const ram = this.createEquipoForm.value.ram;
        const mac = this.createEquipoForm.value.mac;
        const numSerie = this.createEquipoForm.value.numSerie;
        const monitor = this.createEquipoForm.value.monitor;
        const raton = this.createEquipoForm.value.raton;
        const teclado = this.createEquipoForm.value.teclado;


        this.firestoreService
            .createEquipo(idEquipo, marca, modelo, cpu, hdd, ram, mac, numSerie, monitor, raton, teclado)
            .then(
                () => {
                    loading.dismiss().then(() => {
                        this.router.navigateByUrl('');
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
