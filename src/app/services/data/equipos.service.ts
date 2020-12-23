import {Injectable} from '@angular/core';

import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import 'firebase/firestore';
import {EquipoInterface} from "../../interfaces/equipoInterface";
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EquiposService {

  private idEquipo: string;
  private listEquipos: AngularFirestoreCollection<EquipoInterface>;
  private equiposRef = this.afs.collection<EquipoInterface>('equipos');

  constructor(
    public afs: AngularFirestore
  ) {
  }


  // Añade un equipo individual
  createEquipo(equipo: EquipoInterface): Promise<void> {
    return this.equiposRef.doc(equipo.idEquipo).set(equipo);
  }

  // Devuelve la lista de equipos no asignados
  getEquiposNoAsignados() {
    this.listEquipos = this.afs.collection<EquipoInterface>('equipos',
      ref => {
        return ref.where('estado', '==', 'sin asignar');
      });
    return this.listEquipos.valueChanges();
  }

  // Devuelve la lista de equipos de un aula
  getEquiposList(aula): Observable<EquipoInterface[]> {
    // Hay aula, filtro resultados
    // console.log("Hay aula es ", aula);
    this.listEquipos = this.afs.collection<EquipoInterface>('equipos',
      ref => {
        return ref.where('ubicacion.aula', "==", aula);
      });
    return this.listEquipos.valueChanges();

  }

  getAllEquipos() {
    return this.equiposRef.valueChanges();
  }

  // Devuelve el detalle de un equipo
  getEquipoDetail(id: string): Observable<EquipoInterface> {
    return this.equiposRef.doc<EquipoInterface>(id).valueChanges();
  }

  // Actualiza los datos de un equipo
  updateEquipo(equipo: EquipoInterface) {
    // console.log("Update equipo: ", equipo);
    this.equiposRef.doc<EquipoInterface>(equipo.idEquipo).update(equipo);
  }

  updateEstado(estado, idEquipo) {
    this.equiposRef.doc(idEquipo).ref.update({estado: estado});
  }

  // Elimina un equipo
  deleteEquipo(idEquipo) {
    return this.equiposRef.doc(idEquipo).delete();
  }

  // Proceso de creación de un número de equipos. Se crea su idEquipo en orden
  // Recibe número de equipos a crear, primer idequipo
  // TODO comprobar que el id no está siendo utilizado
  generaEquipos(num: number, primerId: string, marca: string, modelo: string): boolean {
    let batch = this.afs.firestore.batch();
    let equipo: EquipoInterface;
    let numId = +primerId.substring(3, 6);
    //console.log("numId es ", numId, " numId+num ", numId+num);
    for (let i = numId; i < numId + num; i++) {
      let numeroATexto = i.toString();
      let indice = numeroATexto.length;
      for (let j = 0; j < 3 - indice; j++) {
        numeroATexto = "0" + numeroATexto;
      }

      let idEquipo = "CPU" + numeroATexto;
      equipo = {
        idEquipo: idEquipo,
        estado: 'sin asignar',
        hardware: {
          marca: marca,
          modelo: modelo,
          procesador: " ",
          memoria: " ",
          discoDuro: " ",
          numSerie: " ",
          direccionMAC: " ",
          monitor: "",
          raton: false,
          teclado: false
        },
        software: {
          so: " ",
          officeVersion: " ",
          antivirus: " ",
          ide1: " ",
          ide2: " ",
          otros: " ",
          userProfesor: " ",
          passProfesor: " ",
          alumno1: " ",
          alumno2: " "
        },
        ubicacion: {
          aula: 'Taller',
          departamento: 'Taller',
          puesto: ''
        }
      }
      const ref = this.equiposRef.doc(equipo.idEquipo).ref;
      batch.set(ref, equipo);
    }
    batch.commit().then(() => {
      return true;
    }).catch(() => {
      return false;
    });
    return true;
  }

  // Actualiza equipos por lotes
  // Llamado desde asignar equipos, tengo idEquipo, aula y departamento, y asignada
  asignarEquipos(equiposAsignados: EquipoInterface[]): boolean {
    let batch = this.afs.firestore.batch();
    let res: boolean = true;
    for (const equiposKey in equiposAsignados) {
      let idEquipo = equiposAsignados[equiposKey].idEquipo;
      const ref = this.afs.collection('equipos').doc(idEquipo).ref;
      batch.update(ref, equiposAsignados[equiposKey])
    }
    batch.commit().then(() => {
      res = true;
    }).catch(() => {
      res = false;
    });
    return res;
  }

  asignarPuestos(puestosAsignados) {
    // console.log(puestosAsignados);
    let batchp = this.afs.firestore.batch();
    for (const puestosAsignadosKey in puestosAsignados) {
      let idEquipo = puestosAsignados[puestosAsignadosKey].idEquipo;
      let puesto = puestosAsignados[puestosAsignadosKey].idPuesto;
      if (idEquipo != "") {
        const ref = this.afs.collection('equipos').doc(idEquipo).ref;
        batchp.update(ref, 'ubicacion.puesto', puesto);
      }
    }
    batchp.commit().then(() => {
      console.log("All ok");
    });
  }
}
