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
    private equipoCollection: AngularFirestoreCollection<Equipo>;

    constructor(public firestore: AngularFirestore) {
        this.equipoCollection = this.firestore.collection<Equipo>('equiposLista');
        this.equipos = this.equipoCollection.snapshotChanges().pipe(
            map(actions => {
                return actions.map(a =>{
                    const data = a.payload.doc.data();
                    const id = a.payload.doc.id;
                    return { id, ...data};
                });
            })
        );
    }

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
        return this.equipos;
    }

    getEquipoDetail(id: string): Observable<EquipoHardware> {
        return this.firestore.collection('equipos').doc<EquipoHardware>(id).valueChanges();
    }
}
