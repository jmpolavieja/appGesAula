import {Component, OnInit} from '@angular/core';
import {AlertController, NavController} from "@ionic/angular";
import {AuthenticateService} from "../../services/auth/authenticate.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UsersService} from "../../services/data/users.service";
import {UsuarioInterface} from "../../models/usuarioInterface";


@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    private loginForm: FormGroup;
    errorMessage: string = '';
    usuario: UsuarioInterface;

    constructor(
        private navCtrl: NavController,
        private authService: AuthenticateService,
        private fb: FormBuilder,
        private router: Router,
        public alerCtrl: AlertController,
        private userService: UsersService
    ) {let uid = localStorage.getItem("UID")
        if(uid == null) {
            this.loginForm = this.fb.group({
                email: new FormControl('', Validators.compose([
                    Validators.required,
                    Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
                ])),
                password: new FormControl('', Validators.compose([
                    Validators.minLength(5),
                    Validators.required
                ])),
            });
        } else {
            // console.log(this.authService.userDetails());
            this.router.navigate(['/dashboard-trm']);
        }
    }


    ngOnInit() {


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
        this.authService.loginUser(value)
            .then(res => {
                console.log(res.user.email);
                this.errorMessage = "";
                this.compruebaUser(res.user.email);
            }, err => {
                this.errorMessage = err.message;
            })
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
                    console.log("UsuarioInterface no dado de alta en el sistema");
                    this.presentAlert();
                }
            }
        )
    }

    async presentAlert(){
        const alert = await this.alerCtrl.create({
            header: 'Alert',
            subHeader: 'Credenciales incorrectas',
            message: "El usuario no está dado de alta en el sistema, póngase en contacto con el administrador.",
            buttons: ['Close']
        });
        await alert.present();
    }
}
