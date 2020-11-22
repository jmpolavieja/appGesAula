import { Injectable } from '@angular/core';
import {FirestoreService} from "./firestore.service";
import {AngularFirestore} from "@angular/fire/firestore";
import 'firebase/firestore';

export interface Prueba {
  idP1: string,
  grupo1: {
    edad:string,
    nombre:string
  },
  grupo2:{
    rama: string,
    titulo: string
  }
}

@Injectable({
  providedIn: 'root'
})
export class Prueba1Service {

  prueba: Prueba;

  constructor(public firestore: AngularFirestore) {

  }

  createPrueba(idP1:string,edad:string,nombre:string,rama:string,titulo:string): Promise<void> {
    this.prueba = {
      idP1,
      grupo1:{
        edad,
        nombre
      },
      grupo2:{
        rama,
        titulo
      }
    }
    return this.firestore.doc(`prueba/${idP1}`).set(this.prueba);
  }
}
