import {Injectable} from '@angular/core';

import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "@angular/fire/firestore";
import 'firebase/firestore';
import {EquipoInterface} from "../../models/equipoInterface";
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

    createEquipo(equipo: EquipoInterface): Promise<void> {
        this.idEquipo = equipo.idEquipo;
        return this.afs.doc(`equipos/${(this.idEquipo)}`).set(equipo);
    }

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

    getEquipoDetail(id: string): Observable<EquipoInterface> {
        return this.afs.collection('equipos').doc<EquipoInterface>(id).valueChanges();
    }

    updateEquipo(equipo: EquipoInterface) {
        let idEquipo = equipo.idEquipo;
        this.equipoDoc = this.afs.doc<EquipoInterface>(`equipos/${idEquipo}`);
        this.equipoDoc.update(equipo);
    }

    deleteEquipo(idEquipo) {
        return this.afs.collection('equipos')
            .doc(idEquipo)
            .delete();
    }

}
