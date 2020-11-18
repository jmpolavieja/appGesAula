import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Equipo} from "../models/equipo";
import {FirestoreService} from "../services/data/firestore.service";
import {AngularFireAuth} from "@angular/fire/auth";
import firebase from "firebase";
import {UsersService} from "../services/data/users.service";
import {Usuario} from "../models/usuario";
import {Router} from "@angular/router";
import {AlertController} from "@ionic/angular";



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public equiposList: Observable<Equipo[]>;
  name: string;
  email: string;
  public usuario: Usuario;

  constructor(
      private firestoreService: FirestoreService,
      private afAuth: AngularFireAuth,
      private userService: UsersService,
      private router: Router,
      public alertController: AlertController
  ) {}

  ngOnInit() {
    this.equiposList = this.firestoreService.getEquiposList();
  }

  async loginGoogle() {
    const res = await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    const user = res.user;
    console.log(user);
    this.compruebaUser(user.email);
    this.name = user.displayName;
    this.email = user.email;
    // todo: comprobar el usuario con la base de datos y dar o no acceso a la aplicación
  }

  compruebaUser(email) {
    console.log(email);
    this.userService.getUser(email).subscribe(
        usuario => {
          this.usuario = usuario;
          //console.log(this.usuario.rol);
          if(typeof this.usuario != "undefined"){
            if(this.usuario.rol == "pra") {
              this.router.navigate(['/dashboard-pra']);
            } else {
              this.router.navigate(['/dashboard-trm']);
            }
          } else {
            // todo: mensaje de que no está dado de alta en el sistema
            console.log("Usuario no dado de alta en el sistema");
            this.presentAlert();
          }
        }
    )
  }

  async presentAlert(){
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Credenciales incorrectas',
      message: "El usuario no está dado de alta en el sistema, póngase en contacto con el administrador.",
      buttons: ['Close']
    });
    await alert.present();
  }
}
