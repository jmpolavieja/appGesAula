import {Component, OnInit} from '@angular/core';
import {EquiposService} from "../../../services/data/equipos.service";
import {Observable, Subscription} from "rxjs";
import {EquipoInterface} from "../../../models/equipo/equipoInterface";
import {ActionSheetController} from "@ionic/angular";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-list-equipos',
    templateUrl: './list-equipos.page.html',
    styleUrls: ['./list-equipos.page.scss'],
})
export class ListEquiposPage implements OnInit {


    public equipos: Observable<EquipoInterface[]>;

    constructor(private firestore: EquiposService,
                public actionSheetController: ActionSheetController,
                private router: Router
    ) {
    }


    ngOnInit() {
        this.equipos = this.firestore.getEquiposList();
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
