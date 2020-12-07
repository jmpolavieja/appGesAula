import {Injectable} from '@angular/core';

import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "@angular/fire/firestore";
import 'firebase/firestore';
import {EquipoInterface} from "../../interfaces/equipoInterface";
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EquiposService {

  private equipoDoc: AngularFirestoreDocument;
  private idEquipo: string;
  private listEquipos: AngularFirestoreCollection<EquipoInterface>;

  constructor(
    public afs: AngularFirestore
  ) {
  }

  // Añade un equipo individual
  createEquipo(equipo: EquipoInterface): Promise<void> {
    this.idEquipo = equipo.idEquipo;
    return this.afs.doc(`equipos/${(this.idEquipo)}`).set(equipo);
  }

  // Devuelve la lista de equipos no asignados
  getEquiposNoAsignados() {
    this.listEquipos = this.afs.collection<EquipoInterface>('equipos',
      ref => {
        return ref.where('estado', '==', 'sin asignar');
      });
    return this.listEquipos.valueChanges();
  }

  // Devuelve la lista de equipos de un aula o todos
  getEquiposList(aula = null): Observable<EquipoInterface[]> {
    if (aula == null) {
      console.log("No hay aula");
      this.listEquipos = this.afs.collection<EquipoInterface>('equipos');
    } else {
      // Hay aula, filtro resultados
      console.log("Hay aula es ", aula);
      this.listEquipos = this.afs.collection<EquipoInterface>('equipos',
        ref => {
          return ref.where('ubicacion.aula', "==", aula);
        });
    }
    return this.listEquipos.valueChanges();
  }

  // Devuelve el detalle de un equipo
  getEquipoDetail(id: string): Observable<EquipoInterface> {
    return this.afs.collection('equipos').doc<EquipoInterface>(id).valueChanges();
  }

  // Actualiza los datos de un equipo
  updateEquipo(equipo: EquipoInterface) {
    let idEquipo = equipo.idEquipo;
    this.equipoDoc = this.afs.doc<EquipoInterface>(`equipos/${idEquipo}`);
    this.equipoDoc.update(equipo);
  }

  // Elimina un equipo
  deleteEquipo(idEquipo) {
    return this.afs.collection('equipos')
      .doc(idEquipo)
      .delete();
  }

  // Proceso de creación de un número de equipos. Se crea su idEquipo en orden
  // Recibe número de equipos a crear, primer idequipo
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
        },
        ubicacion: {
          aula: 'T',
          departamento: 'Taller',
          puesto: ''
        }
      }
      const ref = this.afs.collection('equipos').doc(equipo.idEquipo).ref;
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

  asignarPuestos(puestosAsignados){
    console.log(puestosAsignados);
    let batchp = this.afs.firestore.batch();
    for (const puestosAsignadosKey in puestosAsignados) {
      let idEquipo = puestosAsignados[puestosAsignadosKey].idEquipo;
      let puesto = puestosAsignados[puestosAsignadosKey].idPuesto;
      if(idEquipo != "") {
        const ref = this.afs.collection('equipos').doc(idEquipo).ref;
        batchp.update(ref, 'ubicacion.puesto', puesto);
      }
    }
    batchp.commit().then( () => {
      console.log("All ok");
    });
  }
}
