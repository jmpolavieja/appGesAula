import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AlertController, LoadingController} from "@ionic/angular";
import {EquiposService} from "../../../services/data/equipos.service";
import {ActivatedRoute, Router} from "@angular/router";
import {EquipoInterface} from "../../../models/equipoInterface";
import {TotalesService} from "../../../services/data/totales.service";
import {TotalInterface} from "../../../models/totalInterface";

@Component({
    selector: 'app-create',
    templateUrl: './form-equipo.page.html',
    styleUrls: ['./form-equipo.page.scss'],
})
export class FormEquipoPage implements OnInit {

    public formEquipo = this.fb.group({
        idEquipo: ['', Validators.required],
        marca: ['', Validators.required],
        modelo: ['', Validators.required],
        departamento: ['', Validators.required],
        aula: ['', Validators.required],
        monitor: [''],
        raton: [false, Validators.required],
        teclado: [false, Validators.required]
    });
    private equipo: EquipoInterface;
    private titulo: string;
    private nuevo: boolean;
    private total: TotalInterface;
    private action: string;

    constructor(
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        private equiposService: EquiposService,
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        public totalesService: TotalesService
    ) {
    }

    ngOnInit() {
        if (this.route.snapshot.paramMap.get('nuevo') === "true") {
            this.nuevo = true;
            this.titulo = "Nuevo Equipo";
            this.action = "Add";
            this.totalesService.getOneTotal('equipos')
                .subscribe(total => {
                    this.total = total;
                });
        } else {
            this.nuevo = false
            this.titulo = "Edit Equipo";
            this.action = "Update";
            // Pedir los datos del equipo y colocarlos en el formulario
            const id = this.route.snapshot.paramMap.get('id');
            this.equiposService.getEquipoDetail(id).subscribe(equipo => {
                this.formEquipo.controls.idEquipo.setValue(equipo.idEquipo);
                this.formEquipo.controls.marca.setValue(equipo.hardware.marca);
                this.formEquipo.controls.modelo.setValue(equipo.hardware.modelo);
                this.formEquipo.controls.departamento.setValue(equipo.ubicacion.departamento);
                this.formEquipo.controls.aula.setValue(equipo.ubicacion.aula);
                this.formEquipo.controls.monitor.setValue(equipo.hardware.monitor);
                this.formEquipo.controls.raton.setValue(equipo.hardware.raton);
                this.formEquipo.controls.teclado.setValue(equipo.hardware.teclado);
            });

        }

    }

    async guardaEquipo() {
        // Coger los datos del formulario y ponerlos en el equipo
        const idEquipo = this.formEquipo.value.idEquipo;
        const marca = this.formEquipo.value.marca;
        const modelo = this.formEquipo.value.modelo;
        const departamento = this.formEquipo.value.departamento;
        const aula = this.formEquipo.value.aula;
        const monitor = this.formEquipo.value.monitor;
        const raton = this.formEquipo.value.raton;
        const teclado = this.formEquipo.value.teclado;

        this.equipo = {
            estado: "alta",
            idEquipo,
            hardware: {
                marca,
                modelo,
                procesador: "",
                memoria: "",
                discoDuro: "",
                numSerie: "",
                direccionMAC: "",
                monitor,
                raton,
                teclado
            },
            software: {
                alumno1: "",
                alumno2: "",
                antivirus: "",
                ide1: "",
                ide2: "",
                officeVersion: "",
                otros: "",
                passProfesor: "",
                so: "",
                userProfesor: ""
            },
            ubicacion: {
                aula, departamento, puesto: ""
            }
        }
        // Si es nuevo addEquipo, sino updateEquipo
        if (this.nuevo) {
            this.addEquipo();
        } else {
            this.updateEquipo();
        }
    }

    async addEquipo() {
        //const loading = await this.loadingCtrl.create();
        this.equiposService
            .createEquipo(this.equipo)
            .then(() => {
                // aumentar el contador de equipos totales
                this.updateTotal();
                this.router.navigateByUrl('/dashboard-trm');
            })
            .catch(error => {
                console.error(error);
            });

        //return await loading.present();
    }


    deleteEquipo() {
        console.log('Eliminar el equipo');
    }

    updateTotal(): void {
        this.total.total += 1;
        this.totalesService.updateTotal(this.total);
    }

    updateEquipo(): void {
        this.equiposService.updateEquipo(this.equipo);
        this.router.navigateByUrl('/dashboard-trm');
    }
}
