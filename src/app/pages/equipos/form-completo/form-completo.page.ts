import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {EquiposService} from "../../../services/data/equipos.service";
import {EquipoInterface} from "../../../interfaces/equipoInterface";

@Component({
  selector: 'app-form-completo',
  templateUrl: './form-completo.page.html',
  styleUrls: ['./form-completo.page.scss'],
})
export class FormCompletoPage implements OnInit {

  private equipo: EquipoInterface;
  equipoForm = this.fb.group({
    marca: [''],
    modelo: [''],
    procesador: [''],
    memoria: [''],
    discoDuro: [''],
    numSerie: [''],
    direccionMAC: [''],
    monitor: [''],
    raton: [''],
    teclado: [''],
    so: [''],
    officeVersion: [''],
    antivirus: [''],
    ide1: [''],
    ide2: [''],
    otros: [''],
    userProfesor: [''],
    passProfesor: [''],
    alumno1: [''],
    alumno2: [''],
    aula: [''],
    departamento: [''],
    puesto: ['']
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private equipoSer: EquiposService
  ) {
  }

  ngOnInit() {
    // Leer el equipo
    let idEquipo = this.route.snapshot.paramMap.get('id');
    this.equipoSer.getEquipoDetail(idEquipo).subscribe(
      equipo => {
        this.equipo = equipo;
        this.rellenaForm();
      }
    )
  }

  private rellenaForm() {
    this.equipoForm.controls.marca.setValue(this.equipo.hardware.marca);
    this.equipoForm.controls.modelo.setValue(this.equipo.hardware.modelo);
    this.equipoForm.controls.procesador.setValue(this.equipo.hardware.procesador);
    this.equipoForm.controls.memoria.setValue(this.equipo.hardware.memoria);
    this.equipoForm.controls.discoDuro.setValue(this.equipo.hardware.discoDuro);
    this.equipoForm.controls.numSerie.setValue(this.equipo.hardware.numSerie);
    this.equipoForm.controls.direccionMAC.setValue(this.equipo.hardware.direccionMAC);
    this.equipoForm.controls.monitor.setValue(this.equipo.hardware.monitor);
    this.equipoForm.controls.raton.setValue(this.equipo.hardware.raton);
    this.equipoForm.controls.so.setValue(this.equipo.software.so);
    this.equipoForm.controls.officeVersion.setValue(this.equipo.software.officeVersion);
    this.equipoForm.controls.antivirus.setValue(this.equipo.software.antivirus);
    this.equipoForm.controls.ide1.setValue(this.equipo.software.ide1);
    this.equipoForm.controls.ide2.setValue(this.equipo.software.ide2);
    this.equipoForm.controls.otros.setValue(this.equipo.software.otros);
    this.equipoForm.controls.userProfesor.setValue(this.equipo.software.userProfesor);
    this.equipoForm.controls.passProfesor.setValue(this.equipo.software.passProfesor);
    this.equipoForm.controls.alumno1.setValue(this.equipo.software.alumno1);
    this.equipoForm.controls.alumno2.setValue(this.equipo.software.alumno2);
    this.equipoForm.controls.aula.setValue(this.equipo.ubicacion.aula);
    this.equipoForm.controls.departamento.setValue(this.equipo.ubicacion.departamento);
    this.equipoForm.controls.puesto.setValue(this.equipo.ubicacion.puesto);

  }

  guardar() {
    let controles = this.equipoForm.controls;
    for (const equipoKey in this.equipo) {
      if(equipoKey == "hardware"){
        let hardware = this.equipo.hardware;
        for (const hardwareKey in hardware) {
          hardware[hardwareKey] = controles[hardwareKey].value;
        }
        this.equipo.hardware = hardware;
      }
      if(equipoKey == "software") {
        let software = this.equipo.software;
        for (const softwareKey in software) {
          software[softwareKey] = controles[softwareKey].value;
        }
        this.equipo.software = software;
        console.log(this.equipo);
      }
    }
    // Ahora actualizar el documento del equipo
    this.equipoSer.updateEquipo(this.equipo);
    this.router.navigateByUrl('pra');
  }
}
