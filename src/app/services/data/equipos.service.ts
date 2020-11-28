import {Injectable} from '@angular/core';

import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";
import 'firebase/firestore';
import {EquipoInterface} from "../../models/equipo/equipoInterface";
import {Observable} from 'rxjs';



@Injectable({
    providedIn: 'root'
})
export class EquiposService {

    private equipo: EquipoInterface;
    private equipoDoc: AngularFirestoreDocument;
    private idEquipo: string;

    constructor(
        public afs: AngularFirestore
    ) {}

    createEquipo(equipo: EquipoInterface): Promise<void> {
        this.idEquipo=equipo.idEquipo;
        return this.afs.doc(`equipos/${(this.idEquipo)}`).set(equipo);
    }

    getEquiposList(): Observable<EquipoInterface[]> {
        const listadoEquipos = this.afs.collection<EquipoInterface>('equipos').valueChanges();
        //leo solo los datos que me interesan y los retorno
        listadoEquipos.forEach(equipo => {
            console.log(equipo);
        });
        return listadoEquipos;
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
