import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {EquiposService} from "../../../services/data/equipos.service";
import {EquipoInterface} from "../../../interfaces/equipoInterface";

@Component({
  selector: 'app-form-completo',
  templateUrl: './form-completo.page.html',
  styleUrls: ['./form-completo.page.scss'],
})
export class FormCompletoPage implements OnInit {

  private idEquipo;
  private estado;
  private equipo: EquipoInterface;
  private equipoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private equipoSer: EquiposService
  ) {
    this.equipoForm = this.fb.group({
    marca: [' '],
    modelo: [' '],
    procesador: [' '],
    memoria: [' '],
    discoDuro: [' '],
    numSerie: [' '],
    direccionMAC: [' '],
    monitor: [' '],
    raton: [false],
    teclado: [false],
    so: [' '],
    officeVersion: [' '],
    antivirus: [' '],
    ide1: [' '],
    ide2: [' '],
    otros: [' '],
    userProfesor: [' '],
    passProfesor: [ ' '],
    alumno1: [' '],
    alumno2: [' '],
    aula: [' '],
    departamento: [' '],
    puesto: [' ']
  });
  }

  ngOnInit() {
    // Leer el equipo
    this.idEquipo = this.route.snapshot.paramMap.get('id');
    this.equipoSer.getEquipoDetail(this.idEquipo).subscribe(
      equipo => {
        this.equipo = equipo;
        this.estado = equipo.estado;
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
    // lo primero que tengo que hacer es convertir el array simple de controles en el equipo
    let controles = this.equipoForm.controls;
    let equipo: EquipoInterface = {
      idEquipo: this.idEquipo,
      estado: this.estado,
      hardware: {
        marca: controles.marca.value,
        modelo: controles.modelo.value,
        procesador: controles.procesador.value,
        memoria: controles.memoria.value,
        discoDuro: controles.discoDuro.value,
        numSerie: controles.numSerie.value,
        direccionMAC: controles.direccionMAC.value,
        monitor: controles.monitor.value,
        raton: controles.raton.value,
        teclado: controles.raton.value
      },
      software:{
        so: controles.so.value,
        officeVersion: controles.officeVersion.value,
        antivirus: controles.antivirus.value,
        ide1: controles.ide1.value,
        ide2: controles.ide2.value,
        otros: controles.otros.value,
        userProfesor: controles.userProfesor.value,
        passProfesor: controles.passProfesor.value,
        alumno1: controles.alumno1.value,
        alumno2: controles.alumno2.value
      },
      ubicacion: {
        aula: controles.aula.value,
        departamento: controles.departamento.value,
        puesto: controles.puesto.value
      }
    }

    // Ahora actualizar el documento del equipo
    console.log(this.equipoSer.updateEquipo(equipo));
    this.router.navigateByUrl('/dashboard-pra');
  }
}
