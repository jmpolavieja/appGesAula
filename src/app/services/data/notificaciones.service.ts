import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "@angular/fire/firestore";
import {NotificacionInterface} from "../../models/notificacionInterface";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class NotificacionesService {
    private idNot: string;
    private notCollection: AngularFirestoreCollection<NotificacionInterface>;
    private notiDoc: AngularFirestoreDocument<NotificacionInterface>;

    constructor(public afs: AngularFirestore) {
    }

    setNotificacion(notificacion: NotificacionInterface): Promise<void> {
        this.idNot = notificacion.idNotificacion;
        return this.afs.doc(`notificaciones/${(this.idNot)}`).set(notificacion);
    }

    getNotificaciones(para): Observable<NotificacionInterface[]> {
        /*return this.afs.collection('notificaciones').doc<any>(para);*/
        this.notCollection = this.afs.collection<NotificacionInterface>('notificaciones', ref => {
            return ref.where('para', '==', para);
        });
        return this.notCollection.valueChanges({idField: "idNotificacion"});
    }

    // Update de leído
    marcarLeida(notif: NotificacionInterface) {
        let idNot = notif.idNotificacion;
        this.notiDoc = this.afs.doc<NotificacionInterface>(`notificaciones/${idNot}`);
        this.notiDoc.update(notif);
    }

}
