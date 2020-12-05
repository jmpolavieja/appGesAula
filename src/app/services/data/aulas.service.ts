import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {AulaInterface} from "../../models/aulaInterface";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";

@Injectable({
    providedIn: 'root'
})
export class AulasService {

    private aulaDoc: AngularFirestoreDocument<AulaInterface>;

    constructor(public afs: AngularFirestore) {
    }

    getAulas(): Observable<AulaInterface[]> {
        return this.afs.collection<AulaInterface>('aulas').valueChanges();
    }

    getAulaDetail(idAula: string): Observable<AulaInterface> {
        return this.afs.collection('aulas').doc<AulaInterface>(idAula).valueChanges();
    }

    addAula(aula: AulaInterface)
        : Promise<void> {
        const idAula = aula.idAula;
        const curso = aula.curso;
        const departamento = aula.departamento;
        const equipos = 0;
        return this.afs.doc(`aulas/${idAula}`).set({
            idAula, curso, departamento, equipos
        });
    }

    updateAula(aula: AulaInterface) {
        let idAula = aula.idAula;
        this.aulaDoc = this.afs.doc<AulaInterface>(`aulas/${idAula}`);
        this.aulaDoc.update(aula);
    }

}
