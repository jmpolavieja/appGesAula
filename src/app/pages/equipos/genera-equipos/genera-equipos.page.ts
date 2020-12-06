import {Component, OnInit} from '@angular/core';
import {AlertController} from "@ionic/angular";
import {FormBuilder, Validators} from "@angular/forms";
import {EquiposService} from "../../../services/data/equipos.service";
import {Router} from "@angular/router";
import {TotalesService} from "../../../services/data/totales.service";
import {TotalInterface} from "../../../models/totalInterface";


@Component({
    selector: 'app-modal-genera',
    templateUrl: './genera-equipos.page.html',
    styleUrls: ['./genera-equipos.page.scss'],
})
export class GeneraEquiposPage implements OnInit {

    public datosLote = this.fb.group({
        idEquipo: ['', Validators.required],
        numero: ['', Validators.required],
        marca: ['', Validators.required],
        modelo: ['', Validators.required]
    })
    total: TotalInterface;

    constructor(
        private alertController: AlertController,
        private fb: FormBuilder,
        private eqService: EquiposService,
        private router: Router,
        private totales: TotalesService
        ) {
    }

    ngOnInit() {
        // leo el total de equipos para poder actualizarlo después
        this.totales.getOneTotal('equipos').subscribe(
            total => this.total = total
        );

    }

    generar() {
        console.log('Ahora voy a generar los equipos');
        var numero = +this.datosLote.value.numero;
        var modelo = this.datosLote.value.modelo;
        var marca = this.datosLote.value.marca;
        var primerId = this.datosLote.value.idEquipo;
        if(this.eqService.generaEquipos(numero,primerId,marca,modelo)) {
            console.log("Equipos generados");
            // Actualizar total de equipos;
            this.total.total += numero;
            this.totales.updateTotal(this.total);
            this.router.navigate(['/list-equipos']);
        }
    }
    async presentAlert() {
        const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'Atención',
            subHeader: 'Generación de nuevos equipos',
            message: 'Se va a proceder a crear los equipos.',
            buttons: [{
                text: 'Cancel',
                role: 'cancel',
                cssClass: 'secondary'
            }, {
                text: 'OK',
                handler: () => {
                    this.generar();
                }
            }]
        });

        await alert.present();
    }
}