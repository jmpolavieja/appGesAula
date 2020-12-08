import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {AulaInterface} from "../../interfaces/aulaInterface";
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class AulasService {

  private aulas: AngularFirestoreCollection<AulaInterface>;
  private aulaDoc: AngularFirestoreDocument<AulaInterface>;

  constructor(public afs: AngularFirestore) {
  }

  getAulas(departamento = null): Observable<AulaInterface[]> {
    if (departamento == null) {
      return this.afs.collection<AulaInterface>('aulas').valueChanges();
    } else {
      this.aulas = this.afs.collection<AulaInterface>('aulas', ref => {
        return ref.where('departamento', "==", departamento);
      });
    }
    return this.aulas.valueChanges();
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

  updateIncidenciasAula(incidencias: number, idAula: string) {
    let ref = this.afs.collection('aulas').doc(idAula).ref;
    return ref.update({incidencias: incidencias});
  }


}
