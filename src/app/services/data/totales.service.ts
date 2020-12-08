import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {TotalInterface} from "../../interfaces/totalInterface";
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class TotalesService {

    private totalDoc: AngularFirestoreDocument<TotalInterface>;
    private total: Observable<TotalInterface>;

    constructor(public afs: AngularFirestore) {
    }

    getTotales(): Observable<TotalInterface[]> {
        return this.afs.collection<TotalInterface>('totales').valueChanges({idField: 'docId'});
    }

    getTotal(id: string): Observable<TotalInterface> {
        return this.afs.collection('totales').doc<TotalInterface>(id).valueChanges();
    }

    getOneTotal(totalId: string) {
        this.totalDoc = this.afs.doc<TotalInterface>(`totales/${totalId}`);
        return this.total = this.totalDoc.snapshotChanges().pipe(map(action => {
            if(action.payload.exists === false) {
                return null;
            } else {
                const data = action.payload.data() as TotalInterface;
                data.docId = action.payload.id;
                return data;
             }
        }));

    }

    dameunTotal(totalName) {
        return this.afs.collection('totales').doc(totalName).snapshotChanges();
    }


    updateTotal(total: TotalInterface): void {
        let idTotal = total.docId;
        this.totalDoc = this.afs.doc<TotalInterface>(`totales/${idTotal}`);
        this.totalDoc.update(total);
    }

    updateElTotal(total: number, idTotal) {
        let ref = this.afs.collection('totales').doc(idTotal).ref;
        return ref.update({total: total});
    }
}
