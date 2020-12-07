import {Component, OnInit} from '@angular/core';
import {EquiposService} from "../../../services/data/equipos.service";
import {EquipoInterface} from "../../../interfaces/equipoInterface";
import {ActionSheetController} from "@ionic/angular";
import {ActivatedRoute, Router} from "@angular/router";
import {PuestosService} from "../../../services/data/puestos.service";

@Component({
  selector: 'app-list-equipos',
  templateUrl: './list-equipos.page.html',
  styleUrls: ['./list-equipos.page.scss'],
})
export class ListEquiposPage implements OnInit {

  public idAula: string;
  public equipos: EquipoInterface[];

  constructor(private equiposService: EquiposService,
              private puestosService: PuestosService,
              public actionSheetController: ActionSheetController,
              private router: Router,
              private route: ActivatedRoute
  ) {
  }


  ngOnInit() {

    if (this.route.snapshot.paramMap.get('aula')) {
      this.idAula = this.route.snapshot.paramMap.get('aula');
      this.idAula = this.idAula.charAt(this.idAula.length - 1);
      console.log("tengo aula: ", this.idAula);
      this.equiposService.getEquiposList(this.idAula).subscribe( equipos => {
        this.equipos = equipos;
      });
    } else {
      this.equiposService.getEquiposList().subscribe( equipos => {
        this.equipos = equipos;
      });
    }

  }

  async presentActionPra() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Aula',
      buttons: [
        {
          text: 'Asignación automática',
          icon: 'color-wand-outline',
          handler: () => {
            console.log('Asignación automática');
            this.asignacionAutomatica();
          }
        },
        {
          text: 'Asignación manual',
          icon: 'pencil-outline',
          handler: () => {
            console.log('Asignar Manual');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          icon: 'close',
          handler: () => {
            console.log("cancel clicked");
          }
        }
      ]
    });
    await actionSheet.present();
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
            this.router.navigateByUrl('/asigna-equipos')
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

  private asignacionAutomatica() {
    // Recorrer equipos y preparar array
    let equiposAsignacion: [{idEquipo: string, asignado: boolean}?] = [];
    console.log("Equipos leidos: :", this.equipos);

      for (const equiposKey in this.equipos) {
        const idEquipo = this.equipos[equiposKey].idEquipo;
        console.log(idEquipo);
        var asignado: boolean;
        console.log(this.equipos[equiposKey].ubicacion.puesto);
        asignado = this.equipos[equiposKey].ubicacion.puesto != "";
        console.log(asignado);
        equiposAsignacion.push({idEquipo,asignado: asignado});
      }
      console.log("Equipos Asignación antes del envio: ", equiposAsignacion);
      this.puestosService.asignarEquipos(equiposAsignacion, this.idAula);

  }
}
