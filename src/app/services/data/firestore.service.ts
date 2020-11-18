import {Injectable} from '@angular/core';

import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import 'firebase/firestore';
import {Equipo} from "../../models/equipo";
import {Observable} from 'rxjs';
import {EquipoHardware} from "../../models/equipo-hardware";
import {map} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class FirestoreService {

    private equipos: Observable<Equipo[]>;

    constructor(public firestore: AngularFirestore) {}

    createEquipo(
        idEquipo: string,
        marca: string,
        modelo: string,
        procesador: string,
        discoDuro: string,
        memoria: string,
        mac: string,
        numSerie: string,
        monitor: string,
        raton: boolean,
        teclado: boolean
    ): Promise<void> {
        return this.firestore.doc(`equipos/${idEquipo}`).set({
            idEquipo,
            marca,
            modelo,
            procesador,
            discoDuro,
            memoria,
            mac,
            numSerie,
            monitor,
            raton,
            teclado
        });
    }

    getEquiposList(): Observable<Equipo[]> {
        return this.firestore.collection<Equipo>('equiposLista').valueChanges();
    }

    getEquipoDetail(id: string): Observable<EquipoHardware> {
        return this.firestore.collection('equipos').doc<EquipoHardware>(id).valueChanges();
    }
}
