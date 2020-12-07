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

  constructor(
    public afs: AngularFirestore
  ) {
  }

  createIncidencia() {
    // Este módulo será llamado por el profesor encargado
  }


  listIncNoFinalizadas(): Observable<IncidenciaInterface[]> {
    this.listIncidencias = this.afs.collection<IncidenciaInterface>('incidencias',
      ref => {
      return ref.where('recogida', '==', false);
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
