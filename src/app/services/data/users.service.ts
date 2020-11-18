import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {Observable, Subscription} from "rxjs";
import {Usuario} from "../../models/usuario";

@Injectable({
    providedIn: 'root'
})
export class UsersService {


    constructor(public firestore: AngularFirestore) {
    }

    registerUser(
        name: string,
        email: string,
        rol: string
    ): Promise<void> {
        return this.firestore.doc(`usuarios/${email}`).set({
            name,
            rol,
            email
        });
    }

    getUser(email: string): Observable<Usuario> {
        return this.firestore.collection('usuarios').doc<Usuario>(email).valueChanges()
    }

    getUserList(): Observable<Usuario[]> {
        return this.firestore.collection<Usuario>('usuarios').valueChanges();
    }


}
