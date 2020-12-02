import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {UsuarioInterface} from "../../models/usuarioInterface";

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    private userDoc: AngularFirestoreDocument<UsuarioInterface>;

    constructor(public afs: AngularFirestore) {
    }

    registerUser(
        user: UsuarioInterface
    ): Promise<void> {
        let nombre= user.nombre;
        let email= user.email;
        let rol= user.rol;
        return this.afs.doc(`usuarios/${user.email}`).set({
            nombre,email,rol
        });
    }

    getUser(email: string): Observable<UsuarioInterface> {
        return this.afs.collection('usuarios').doc<UsuarioInterface>(email).valueChanges()
    }

    getUserList(): Observable<UsuarioInterface[]> {
        return this.afs.collection<UsuarioInterface>('usuarios').valueChanges();
    }

    updateUser(user: UsuarioInterface) {
        let idUser = user.email;
        this.userDoc = this.afs.doc<UsuarioInterface>(`usuarios/${idUser}`);
        this.userDoc.update(user);
    }
}
