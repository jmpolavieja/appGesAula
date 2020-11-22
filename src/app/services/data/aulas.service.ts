import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Aula} from "../../models/aula";
import {AngularFirestore} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class AulasService {

  private aulas: Observable<Aula[]>;
  private idAula: string;

  constructor(public firestore: AngularFirestore) { }

  getAulas(): Observable<Aula[]> {
    return this.firestore.collection<Aula>('aulas').valueChanges();
  }

  getAulaDetail(idAula: string): Observable<Aula> {
    return this.firestore.collection('aulas').doc<Aula>(idAula).valueChanges();
  }
}
