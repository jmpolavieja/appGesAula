import {Component, OnInit} from '@angular/core';
import {AulasService} from "../../../services/data/aulas.service";
import {AulaInterface} from "../../../interfaces/aulaInterface";
import {UsersService} from "../../../services/data/users.service";
import {Observable} from "rxjs";
import {AuthService} from "../../../services/auth.service";
import {User} from "../../../shared/user";
import {UsuarioInterface} from "../../../interfaces/usuarioInterface";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard-pdd',
  templateUrl: './dashboard-pdd.page.html',
  styleUrls: ['./dashboard-pdd.page.scss'],
})
export class DashboardPddPage implements OnInit {

  aulas: Observable<AulaInterface[]>;
  user: Observable<User>;
  private usuario: UsuarioInterface;

  constructor(
    private aulasService: AulasService,
    private userService: UsersService,
    private afs: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = this.afs.currentUser;
    this.user.subscribe( user => {
      if(user) {
        let email = user.email;
        console.log(email);
        this.userService.getUser(email).subscribe(
          (usuario) => {
            this.usuario = usuario;
            if(this.usuario.rol != "pdd") {
              this.router.navigateByUrl('/login');
            }
          },
          (error => {
            console.log(error);
          })
        );
      } else {
        this.router.navigateByUrl('/login');
      }
    })
    this.aulas = this.aulasService.getAulas('Informática');
  }

  logOut() {
    this.afs.singOut();
  }
}
