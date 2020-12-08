import {Injectable} from '@angular/core';

import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import 'firebase/firestore';
import {Observable} from "rxjs";
import {IncidenciaInterface} from "../../interfaces/incidenciaInterface";

@Injectable({
  providedIn: 'root'
})
export class IncidenciasService {

  listIncidencias: AngularFirestoreCollection<IncidenciaInterface>;
  dataNewInc: IncidenciaInterface;

  constructor(
    private afs: AngularFirestore
  ) {
  }

  createIncidencia(data: IncidenciaInterface): Promise<void> {
    // Este módulo será llamado por el profesor encargado
    // Recibo la incidencia y la guardo en la base de datos
    console.log("CreateIncidencia.data= ", data);
    let idIncidencia = data.idIncidencia;
    return this.afs.doc(`incidencias/${(idIncidencia)}`).set(data);
  }

  listIncNoFinalizadas(): Observable<IncidenciaInterface[]> {
    this.listIncidencias = this.afs.collection<IncidenciaInterface>('incidencias',
      ref => {
        return ref.where('recogida', '==', false);
      });
    return this.listIncidencias.valueChanges({idField: 'idIncidencia'});
  }

  listIncAula(idAula): Observable<IncidenciaInterface[]> {
    this.listIncidencias = this.afs.collection<IncidenciaInterface>('incidencias',
      ref => {
      return ref.where('aula', '==', idAula);
      });
    return this.listIncidencias.valueChanges({idField: 'idIncidencia'});
  }

  getIncidenciaDetail(idInc: string): Observable<IncidenciaInterface> {
    return this.afs.collection('incidencias').doc<IncidenciaInterface>(idInc).valueChanges();
  }

  // Actualizar los datos de la incidencia
  updateIncidencia(inc: IncidenciaInterface): boolean {
    let res: boolean = true;
    let idIncidencia = inc.idIncidencia;
    this.afs.doc<IncidenciaInterface>(`incidencias/${idIncidencia}`).update(inc)
      .then(() => {
        res = true;
      })
      .catch(() => {
        res = false;
      });
    return res;
  }
}
