import {Injectable} from '@angular/core';

import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "@angular/fire/firestore";
import {Puestos} from "../../interfaces/puestos";
import {AulaInterface} from "../../interfaces/aulaInterface";
import firebase from "firebase";
import DocumentReference = firebase.firestore.DocumentReference;
import {EquiposService} from "./equipos.service";

@Injectable({
  providedIn: 'root'
})
export class PuestosService {

  private listPuestos: AngularFirestoreCollection<Puestos>;

  constructor(
    private afs: AngularFirestore,
    private eqSer: EquiposService
  ) {
  }

  // Lee los puestos de un aula
  getPuestos(idAula) {
    //console.log('Hola');
    this.listPuestos = this.afs.collection<AulaInterface>('aulas').doc<AulaInterface>(idAula).collection<any>('puestos');
    return this.listPuestos.valueChanges({idField: 'idPuesto'});
    /*return this.afs.collection<AulaInterface>('aulas')
      .doc(idAula).collection<Puestos>('puestos').valueChanges();*/
  }

  asignarEquipos(equipos: { idEquipo: string, asignado: boolean }[], idAula: string) {
    idAula = "Aula " + idAula;
    let batch = this.afs.firestore.batch();

    console.log('asignarEquipos, equipos: ', equipos);
    // Recibo un array de equipos asignado o no { idequipo, asignado:boolean }
    this.getPuestos(idAula).subscribe(puestos => {
      console.log("Los puestos: ", puestos);
      for (const listPuestosKey in puestos) {
        // Leo el puesto, si está libre le asigno el primer equipo no asignado
        if (puestos[listPuestosKey].idEquipo == "") {
          for (const equiposKey in equipos) {
            if (!equipos[equiposKey].asignado) {
              puestos[listPuestosKey].idEquipo = equipos[equiposKey].idEquipo;
              equipos[equiposKey].asignado = true;
              let idPuesto = puestos[listPuestosKey].idPuesto;
              let idequipo = equipos[equiposKey].idEquipo;
              const ref = this.afs.collection('aulas').doc(idAula).collection('puestos').doc(idPuesto).ref;
              batch.update(ref, 'idEquipo', idequipo);
              break;
            }
          }
        }
      }
      // update puestos
      batch.commit().then(()=>{
        console.log("Actualización completa");
        this.eqSer.asignarPuestos(puestos);
      });

    });

  }
}
