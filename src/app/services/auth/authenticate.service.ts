import {Injectable, NgZone} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {Router} from "@angular/router";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";
import {User} from "../../shared/user";


@Injectable({
    providedIn: 'root'
})
export class AuthenticateService {

    userData: any;

    public uidUser: any;
    token: any;

    constructor(
        private afAuth: AngularFireAuth,
        public afs: AngularFirestore,
        public ngZone: NgZone,
        public router: Router
    ) {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.userData = user;
                this.uidUser = user.uid;
                localStorage.setItem('user', JSON.stringify(this.userData));
                JSON.parse(localStorage.getItem('user'));
            } else {
                localStorage.setItem('user', null);
                JSON.parse(localStorage.getItem('user'));
            }
        })
    }

    login(email, password) {
        return this.afAuth.signInWithEmailAndPassword(email, password).then((result) => {
            this.ngZone.run(() => {
                this.router.navigate(['dashboard-pra']);
            });
            this.setUserData(result.user);
        }).catch((error) => {
            window.alert(error.message)
        });
    }

    get isLoggedin(): boolean {
        const user = JSON.parse(localStorage.getItem('user'));
        return (user !== null);
    }

    setUserData(user) {
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`usuarios/${user.uid}`);
        const userData: User = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            emailVerified: user.emailVerified
        }
        return userRef.set(userData, {
            merge: true
        })
    }

    loginUser(value) {
        return new Promise<any>((resolve, reject) => {
            this.afAuth.signInWithEmailAndPassword(value.email, value.password)
                .then(
                    res => {
                        resolve(res);
                        this.uidUser = res.user.uid;
                        console.log("UID: ", this.uidUser);
                        localStorage.setItem("UID", this.uidUser);
                    },
                    err => reject(err)
                )
        });
    }

    signOut() {
        return this.afAuth.signOut().then(() => {
            localStorage.removeItem('user');
            this.router.navigate(['login']);
        })
    }

    logoutUser() {
        return new Promise((resolve, reject) => {
            if (this.afAuth.currentUser) {
                this.afAuth.signOut()
                    .then(() => {
                        console.log("Logout");
                        resolve();
                        // Navegar a página de login

                    }).catch((error) => {
                    reject(error);
                });
            }
        })
    }

    userDetails() {
        console.log("user: " + this.afAuth.user);
        return this.afAuth.user;
    }

    get isLoggedIn(): boolean {
        const user = localStorage.getItem('user')
        return (user !== null);
    }

    userLogeado() {
        return new Promise((resolve, reject) => {
            this.afAuth.user;
        });
    }

    isAuthenticated() {
        return !!this.userLogeado();

    }
}
