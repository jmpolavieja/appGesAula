import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {Router} from "@angular/router";


@Injectable({
    providedIn: 'root'
})
export class AuthenticateService {

    userData: any;

    public uidUser: any;
    token: any;

    constructor(
        private afAuth: AngularFireAuth,
        public router: Router
    ) {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.uidUser = user.uid;
                localStorage.setItem('user', this.uidUser);
            } else {
                localStorage.setItem('user', null);
            }
        })
    }

    login(email, password) {
        return this.afAuth.signInWithEmailAndPassword(email, password);
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

    Signut() {
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
                    reject();
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
        return (user !== null) ? true : false;
    }

    userLogeado() {
        return new Promise((resolve, reject) => {
            this.afAuth.user;
        });
    }

    isAuthenticated() {
        if (this.userLogeado()) {
            return true;
        }
        return false;
    }
}
