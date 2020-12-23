import {Component, OnInit} from '@angular/core';
import {EquiposService} from "../../../services/data/equipos.service";
import {EquipoInterface} from "../../../interfaces/equipoInterface";
import {AlertController} from "@ionic/angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-asigna-equipos',
  templateUrl: './asigna-equipos.page.html',
  styleUrls: ['./asigna-equipos.page.scss'],
})
export class AsignaEquiposPage implements OnInit {

  private listEquipos: EquipoInterface[];
  private equiposAsignar: string[] = [];
  private equiposAsignados: EquipoInterface[] = [];

  constructor(
    private equiposService: EquiposService,
    private alertCtrl: AlertController,
    private router: Router
  ) {
  }

  ngOnInit() {
    //this.listEquipos = this.equiposService.getEquiposNoAsignados();
    this.equiposService.getEquiposNoAsignados().subscribe(
      equipos => {
        this.listEquipos = equipos;
        console.log(this.listEquipos);
      })
  }

  selecciona(idEquipo: string) {
    // Cada vez que se selecciona un equipo se añade o se quita del array equiposAsignar
    this.equiposAsignar.push(idEquipo);
    console.log(this.equiposAsignar);
  }

  async asignarEquipos() {
    // Asignar los equipos, preguntar primero el aula (ubicación)
    const alert = await this.alertCtrl.create({
      cssClass: 'miclase',
      header: 'Ubicación',
      inputs: [
        {
          name: 'aula',
          type: 'text',
          placeholder: 'Aula N'
        },
        {
          name: 'departamento',
          type: 'text',
          placeholder: 'departamento'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Ok',
          handler: data => {
            // Guardar asignación
            console.log('Confirm Ok', data.aula);
            // Recorremos al array con los idequipos seleccionados
            for (const equipoKey in this.equiposAsignar) {
              let idEquipo = this.equiposAsignar[equipoKey];
              // busco el equipo seleccionado
              let equipo = this.listEquipos.find(equipo => equipo.idEquipo == idEquipo);
              // console.log(this.equiposAsignar);
              // modifico las propiedades del equipo correspondiente
              equipo.idEquipo = idEquipo;
              equipo.estado = "asignado";
              equipo.ubicacion.aula = data.aula.substring(5, data.aula.length);
              equipo.ubicacion.departamento = data.departamento;
              this.equiposAsignados.push(equipo);
            }
            // Ya tengo el array de equipos asignados, los envío al proveso por lotes para su actualización
            // console.log(this.equiposAsignados);
            this.equiposService.asignarEquipos(this.equiposAsignados);
            this.router.navigateByUrl('/list-equipos');
          }
        }
      ]
    });
    await alert.present();
  }
}
