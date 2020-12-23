import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AlertController, LoadingController} from "@ionic/angular";
import {EquiposService} from "../../../services/data/equipos.service";
import {ActivatedRoute, Router} from "@angular/router";
import {EquipoInterface} from "../../../interfaces/equipoInterface";
import {TotalesService} from "../../../services/data/totales.service";
import {TotalInterface} from "../../../interfaces/totalInterface";

@Component({
    selector: 'app-create',
    templateUrl: './form-equipo.page.html',
    styleUrls: ['./form-equipo.page.scss'],
})
export class FormEquipoPage implements OnInit {

    public formEquipo: FormGroup;
    private equipo: EquipoInterface;
    public titulo: string;
    private nuevo: boolean;
    private total: TotalInterface;
    public action: string;

    constructor(
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        private equiposService: EquiposService,
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        public totalesService: TotalesService
    ) {
       this.formEquipo = this.fb.group({
            idEquipo: ['', Validators.required],
            marca: ['', Validators.required],
            modelo: ['', Validators.required],
            departamento: ['', Validators.required],
            aula: ['', Validators.required],
            monitor: ['', Validators.required],
            raton: [false, Validators.required],
            teclado: [false, Validators.required]
        });
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
                this.equipo = equipo;
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
        this.equipo.idEquipo = this.formEquipo.value.idEquipo;
        this.equipo.hardware.marca = this.formEquipo.value.marca;
        this.equipo.hardware.modelo = this.formEquipo.value.modelo;
        this.equipo.ubicacion.departamento = this.formEquipo.value.departamento;
        this.equipo.ubicacion.aula = this.formEquipo.value.aula;
        this.equipo.hardware.monitor = this.formEquipo.value.monitor;
        this.equipo.hardware.raton = this.formEquipo.value.raton;
        this.equipo.hardware.teclado = this.formEquipo.value.teclado;

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


    deleteEquipo(idEquipo) {
        // console.log('Eliminar el equipo');
        this.equiposService.deleteEquipo(idEquipo)
    }

    updateTotal(): void {
        this.total.total += 1;
        this.totalesService.updateTotal(this.total);
    }

    updateEquipo(): void {
        this.equiposService.updateEquipo(this.equipo);
        this.router.navigateByUrl('/list-equipos');
    }

}
