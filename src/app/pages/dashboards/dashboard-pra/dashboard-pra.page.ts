import {Component, OnInit} from '@angular/core';
import firebase from "firebase";
import {UsersService} from "../../../services/data/users.service";
import {AuthService} from "../../../services/auth.service";
import {Observable} from "rxjs";
import {AulasService} from "../../../services/data/aulas.service";
import {AulaInterface} from "../../../models/aulaInterface";
import {BarcodeScanner} from "@ionic-native/barcode-scanner/ngx";
import {Router} from "@angular/router";

@Component({
    selector: 'app-dashboard-pra',
    templateUrl: './dashboard-pra.page.html',
    styleUrls: ['./dashboard-pra.page.scss'],
})
export class DashboardPraPage implements OnInit {

    public num = 30;
    public numInc = 2;
    name: String;private data: any;
    aula: Observable<AulaInterface>;
    private user: firebase.User;
    private idAula: string = "";
    private totalEquipos: any = 0;

    constructor(
        private usersService: UsersService,
        private authService: AuthService,
        private aulasService: AulasService,
        private barcodeScanner: BarcodeScanner,
        private router: Router
    ) {
    }

    ngOnInit() {
        // leer el nombre del usuario
        this.authService.userDetails().subscribe((user) => {
            this.user = user;
            if(this.user.email) {
                this.usersService.getUser(this.user.email).subscribe(
                    usuario => {
                        this.name = usuario.nombre;
                        this.idAula = usuario.aula;
                        //console.log(this.idAula);
                        if(this.user != null) {
                            //console.log("Aula if ", this.idAula);
                            this.aulasService.getAulaDetail(this.idAula)
                                .subscribe( (aula)=> {
                                    this.totalEquipos = aula.equipos;
                                });

                        }
                    }
                )
            }
        });
    }

    logout() {
        this.authService.logoutUser();
        this.router.navigate([('/login')]);
    }

    scan() {
        // TODO activar la búsqueda si es un idequipo
        this.data = null;
        this.barcodeScanner.scan().then(barcodeData => {
            console.log("Equipo: ", barcodeData);
            this.data = barcodeData;
        }).catch(err => {
            console.log('Error ', err);
        });
    }
}
