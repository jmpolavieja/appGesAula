import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {UsersService} from "../../services/data/users.service";
import {UsuarioInterface} from "../../interfaces/usuarioInterface";
import {Router} from "@angular/router";

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
      private userService: UsersService
  ) { }

  ngOnInit() {
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
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ]
  };

  loginUser(value) {
    this.authService.loginUser(value)
        .then(res => {
          this.userMail = res.user.email;// res devuelve el user
          this.errorMessage = "";
          this.compruebaUser();
        }, err => {
          this.errorMessage = err.message;
        })
  }

  compruebaUser() {
    this.userService.getUser(this.userMail).subscribe(
        usuario => {
          this.usuario = usuario;
          //console.log(this.usuario.rol);
          if(typeof this.usuario != "undefined"){
            if(this.usuario.rol == "pra") {
              this.router.navigate(['/pra']);
            } else if(this.usuario.rol == "trm") {
              this.router.navigate(['/trm']);
            } else {
              this.router.navigate(['/pdd']);
            }
          } else {
            // todo: mensaje de que no está dado de alta en el sistema
            console.log("Usuario no dado de alta en el sistema");

          }
        }
    )
  }
}
