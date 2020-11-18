import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {Total} from "../../models/total";

@Injectable({
  providedIn: 'root'
})
export class TotalesService {

  constructor(public firestore: AngularFirestore) { }

  getTotales(): Observable<Total[]> {
    return this.firestore.collection<Total>('totales').valueChanges();
  }

  getTotal(id: string): Observable<number> {
    return this.firestore.collection('totales').doc<number>(id).valueChanges();
  }

  setTotal( id:string): Promise<void> {
    // Primero leo el total solicitado
    var totalAnterior: Observable<number>;
    totalAnterior = this.getTotal(id);
    console.log(totalAnterior);
    return this.firestore.collection('totales').doc(id).set(totalAnterior);
  }
}
