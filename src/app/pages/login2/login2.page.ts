import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {UsersService} from "../../services/data/users.service";
import {UsuarioInterface} from "../../interfaces/usuarioInterface";
import {Router} from "@angular/router";
import {ToastController} from "@ionic/angular";
import {NativeStorage} from "@ionic-native/native-storage/ngx";
import {LoaderService} from "../../services/loader.service";

@Component({
  selector: 'app-login2',
  templateUrl: './login2.page.html',
  styleUrls: ['./login2.page.scss'],
})
export class Login2Page implements OnInit {

  validations_form: FormGroup;
  errorMessage: string = '';
  userMail: string;
  usuario: UsuarioInterface;

  constructor(
    public authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private toastCtrl: ToastController,
    private nativeStorage: NativeStorage,
    private loader: LoaderService
  ) {
  }

  ngOnInit() {
    console.log('Hola soy login2');
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }

  validation_messages = {
    'email': [
      {type: 'required', message: 'Email is required.'},
      {type: 'pattern', message: 'Please enter a valid email.'}
    ],
    'password': [
      {type: 'required', message: 'Password is required.'},
      {type: 'minlength', message: 'Password must be at least 5 characters long.'}
    ]
  };

  loginUser(value) {
    // Primero llamar al loading
    this.loader.showLoader();
    this.authService.loginUser(value)
      .then(res => {
        this.userMail = res.user.email;// res devuelve el user
        //console.log(res.user);
        this.errorMessage = "";
        this.compruebaUser();
      }, err => {
        console.log("Error de autenticación", err);
        this.errorMessage = err.message;
        this.validations_form.reset();
        this.loader.hideLoader();
      }).catch ((err) => {
        console.log('Error autenticación', err);
        this.loader.hideLoader();
    });

  }

  compruebaUser() {
    // Aquí se comprueba que el usuario está dado de alta en la colección de usuarios
    // se comprueba su rol para enviarlo a su pantalla de inicio correspondiente
    this.userService.getUser(this.userMail).subscribe(
      usuario => {
        this.loader.hideLoader();
        this.usuario = usuario;
        //console.log("Login2 rol: ", this.usuario.rol);
        this.nativeStorage.setItem('user', usuario).then(
          () => this.presentToast('Usuario almacenado: ' + usuario.nombre),
          error => {
            localStorage.setItem('user',JSON.stringify(usuario));
            this.presentToast('Datos almacenados el localStorage');
          }
        );
        if (typeof this.usuario != "undefined") {
          var url = "/dashboard-" + this.usuario.rol;
          //this.nativeStorage.setItem('user', usuario);
          this.router.navigateByUrl(url);
        } else {
          // mensaje de que no está dado de alta en el sistema
          this.presentToast('Usuario no registrado en el sistema , póngase en contacto con el administrador.');
        }
      }
    )
  }

  async presentToast(mensaje) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 3000
    });
    toast.present();
  }

}
