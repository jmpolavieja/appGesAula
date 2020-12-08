import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {Observable} from "rxjs";
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userData: any;
  public uidUser: any;
  private user: Observable<firebase.User | null>;

  constructor(
    private afAuth: AngularFireAuth
  ) {
    this.user = this.afAuth.authState;
  }
  get autheticated():boolean {
    return this.user != null;
  }

  get currentUser(): Observable<firebase.User | null> {
    return this.user;
  }

  registerUser(value) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.createUserWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res),
          err => reject(err)
        )
    })
  }

  loginUser(value) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(value.email, value.password)
        .then(
          res => {
            resolve(res);
          },
          err => reject(err))
    })
  }

  logoutUser() {
    return new Promise((resolve, reject) => {
      if (this.afAuth.currentUser) {
        this.afAuth.signOut()
          .then(() => {
            console.log("LOG Out");
            resolve();
          }).catch((error) => {
          reject(error);
        });
      }
    })
  }

  singOut(): Promise<void> {
    return this.afAuth.signOut();
  }
  userDetails() {
    return this.afAuth.user;
  }

  resetPassword(email): Promise<void> {
    return this.afAuth.sendPasswordResetEmail(email);
  }
}
