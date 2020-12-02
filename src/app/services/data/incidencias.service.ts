import {Injectable} from '@angular/core';

import {AngularFirestore} from "@angular/fire/firestore";
import 'firebase/firestore';
import {Observable} from "rxjs";
import {IncidenciaInterface} from "../../models/incidenciaInterface";

@Injectable({
    providedIn: 'root'
})
export class IncidenciasService {

    constructor(
        public afs: AngularFirestore
    ) {
    }

    addIncidencia() {
        // Este módulo será llamado por el profesor encargado
    }

    listaIncidencias(): Observable<IncidenciaInterface[]> {
        return this.afs.collection<IncidenciaInterface>('incidencias').valueChanges({idField: 'idIncidencia'});
    }

    getIncidenciaDetail(idInc: string): Observable<IncidenciaInterface> {
        return this.afs.collection('incidencias').doc<IncidenciaInterface>(idInc).valueChanges();
    }

}
