import {Injectable} from '@angular/core';

import {AngularFirestore} from "@angular/fire/firestore";
import 'firebase/firestore';
import {Equipo} from "../../models/equipo/equipo";
import {Observable} from 'rxjs';



@Injectable({
    providedIn: 'root'
})
export class FirestoreService {

    private equipos: Observable<Equipo[]>;
    private idEquipo: string;

    constructor(
        public firestore: AngularFirestore
    ) {}

    createEquipo(equipo: Equipo): Promise<void> {
        this.idEquipo=equipo.idEquipo;
        return this.firestore.doc(`equipos/${(this.idEquipo)}`).set(equipo);
    }

    getEquiposList(): Observable<Equipo[]> {
        return this.firestore.collection<Equipo>('equipos').valueChanges();
    }

    getEquipoDetail(id: string): Observable<Equipo> {
        return this.firestore.collection('equipos').doc<Equipo>(id).valueChanges();
    }
}
