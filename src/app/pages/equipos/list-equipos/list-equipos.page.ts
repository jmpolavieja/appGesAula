import {Component, OnInit} from '@angular/core';
import {EquiposService} from "../../../services/data/equipos.service";
import {Observable} from "rxjs";
import {EquipoInterface} from "../../../models/equipoInterface";
import {ActionSheetController} from "@ionic/angular";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-list-equipos',
    templateUrl: './list-equipos.page.html',
    styleUrls: ['./list-equipos.page.scss'],
})
export class ListEquiposPage implements OnInit {

    public idAula: string;
    public equipos: Observable<EquipoInterface[]>;

    constructor(private equiposService: EquiposService,
                public actionSheetController: ActionSheetController,
                private router: Router,
                private route: ActivatedRoute
    ) {}


    ngOnInit() {

        if(this.route.snapshot.paramMap.get('aula')) {
            this.idAula = this.route.snapshot.paramMap.get('aula');
            this.idAula = this.idAula.charAt(this.idAula.length-1);
            console.log("tengo aula: ", this.idAula);
            this.equipos = this.equiposService.getEquiposList(this.idAula);
        } else {
            this.equipos = this.equiposService.getEquiposList();
        }

    }

    async presentActionSheet() {
        const actionSheet = await this.actionSheetController.create({
            header: 'Equipos',
            buttons: [
                {
                    text: 'Genera Equipos',
                    icon: 'qr-code',
                    handler: () => {
                        console.log("Genera clicked");
                        this.router.navigate(['/genera-equipos']);
                    }
                },
                {
                    text: 'Add Equipo',
                    icon: 'add',
                    handler: () => {
                        this.router.navigateByUrl('/nuevo-equipo/true')
                    }
                },
                {
                    text: 'Asignar Equipos',
                    icon: "settings",
                    handler: () => {
                        console.log("Asignar clicked");
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    icon: 'close',
                    handler: () => {
                        console.log("cancel clicked");
                    }
                }]
        });
        await actionSheet.present();
    }

}
