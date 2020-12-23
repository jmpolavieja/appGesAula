import {Component, OnInit} from '@angular/core';
import {AulasService} from "../../../services/data/aulas.service";
import {AulaInterface} from "../../../interfaces/aulaInterface";
import {UsersService} from "../../../services/data/users.service";
import {Observable} from "rxjs";
import {AuthService} from "../../../services/auth.service";
import {User} from "../../../shared/user";
import {UsuarioInterface} from "../../../interfaces/usuarioInterface";
import {Router} from "@angular/router";
import {LoaderService} from "../../../services/loader.service";

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
    private router: Router,
    private loader: LoaderService
  ) { }

  ngOnInit() {
    this.loader.showLoader();
    this.user = this.afs.currentUser;
    this.user.subscribe( user => {
      this.loader.hideLoader();
      if(user) {
        let email = user.email;
        // console.log(email);
        this.userService.getUser(email).subscribe(
          (usuario) => {
            this.usuario = usuario;
            this.aulas = this.aulasService.getAulasDepartamento(this.usuario.departamento);
            if(this.usuario.rol != "pdd") {
              this.router.navigateByUrl('/login');
            }
          },
          (error => {
            console.log(error);
          })
        );
      } else if (this.usuario.rol == 'trm') {
        this.router.navigateByUrl('/dashboard-trm');
      } else if (this.usuario.rol == 'pra') {
        this.router.navigateByUrl('/dashboard-pra');
      }else{
        this.router.navigateByUrl('/login');
      }

    })
  }

  logOut() {
    this.afs.singOut();
  }
}
