import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import firebase from 'firebase';
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthFirebaseService {

  private user: Observable<firebase.User | null>;

  constructor(private afAuth: AngularFireAuth) {
    this.user = this.afAuth.authState;
  }

  get authenticated(): boolean {
    return this.user != null; // True o False
  }

  get currentUser(): Observable<firebase.User | null> {
    return this.user;
  }

  // Autentiación con Google
  authWithGoogle(): Promise<firebase.auth.UserCredential> {
    const provider: firebase.auth.GoogleAuthProvider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

    return this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  signOut(): Promise<void> {
    return this.afAuth.signOut();
  }



}
