import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {AulaInterface} from "../../interfaces/aulaInterface";
import {AngularFirestore} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class AulasService {

  private aulasRef = this.afs.collection<AulaInterface>('aulas');

  constructor(public afs: AngularFirestore) {
  }

  // LEER LAS AULAS POR DEPARTAMENTO
  getAulasDepartamento (departamento: string) {
    // devuelve un observable con las aulas del departamento en cuestion
    const aulas = this.afs.collection<AulaInterface>('aulas', ref => {
      return ref.where('departamento', "==", departamento);
    });
    return aulas.valueChanges();
  }


  getAulas(): Observable<AulaInterface[]> {
      // Devuelve un observable con todas las aulas
      return this.aulasRef.valueChanges();
  }

  // Devuelve el detalle de unaula
  getAulaDetail(idAula: string): Observable<AulaInterface> {
    return this.aulasRef.doc<AulaInterface>(idAula).valueChanges();
  }

  // Añade un aula a la colección
  addAula(aula: AulaInterface) {
    return this.aulasRef.doc(aula.idAula).set(aula);
  }

  // Actualiza un aula
  updateAula(aula: AulaInterface) {
    this.aulasRef.doc<AulaInterface>(aula.idAula).update(aula);
  }

  // Actualiza el total de incidencias de un aula
  updateIncidenciasAula(incidencias: number, idAula: string) {
    this.aulasRef.doc(idAula).update({incidencias: incidencias});
  }

  // Configuración del aula: filas y columnas
  setFilaColAula(idAula: string, filas: number, cols: number) {
    // primero guardo las filas y columnas
    this.aulasRef.doc(idAula).update({
      columnas: cols,
      filas: filas
    });
    // Segundo usando el servicio puestos, creo la subcolección de puestos y la añado al aula
  }

  // Elimina un aula
  deleteAula(idAula) {
    this.aulasRef.doc(idAula).delete();
  }

}
