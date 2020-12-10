import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";

import {UsersService} from "../../../services/data/users.service";

import {AlertController, LoadingController} from "@ionic/angular";
import {UsuarioInterface} from "../../../interfaces/usuarioInterface";
import {ActivatedRoute, Router} from "@angular/router";
import {TotalesService} from "../../../services/data/totales.service";
import {TotalInterface} from "../../../interfaces/totalInterface";

@Component({
    selector: 'app-new-user',
    templateUrl: './new-user.page.html',
    styleUrls: ['./new-user.page.scss'],
})
export class NewUserPage implements OnInit {

    public usuarioFG = this.fb.group({
        nombre: ['', Validators.required],
        email: ['', Validators.required],
        rol: ['', Validators.required]
    });
    public user: UsuarioInterface;
    total: TotalInterface;
    titulo: string;
    action: string;
    private nuevo: Boolean;

    constructor(
        private userService: UsersService,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private totalesService: TotalesService
    ) {
    }

    ngOnInit() {
        if(this.route.snapshot.paramMap.get('nuevo') === 'true') {
            this.nuevo = true;
            this.titulo = "New User";
            this.action = "Add";
            this.totalesService.getOneTotal('usuarios').subscribe(total => {
                this.total = total;
            });
        } else {
            this.nuevo = false;
            this.titulo = "Edit User";
            this.action = "Update";
            const id = this.route.snapshot.paramMap.get('id');
            this.userService.getUser(id).subscribe( user => {
                this.usuarioFG.controls.email.setValue(user.email);
                this.usuarioFG.controls.nombre.setValue(user.nombre);
                this.usuarioFG.controls.rol.setValue(user.rol);
            });
        }
    }

    async guardarUsuario() {
        //const loading = await this.loadingCtrl.create();
        const idUser = this.usuarioFG.value.email;
        const nombre = this.usuarioFG.value.nombre;
        const email = idUser;
        const rol = this.usuarioFG.value.rol;

        this.user = {
            nombre: nombre,
            rol: rol,
            email: email
        }
        if(this.nuevo) {
            this.addUser();
        } else {
            this.updateuser();
        }
    }

    async addUser() {
        //const loading = await this.loadingCtrl.create();
        this.userService.registerUser(this.user)
            .then(() => {
                this.updateTotal();
                this.router.navigateByUrl('/trm');
            })
            .catch( error => {
                console.error(error);
            })
    }

    updateuser(): void{
        this.userService.updateUser(this.user);
        this.router.navigateByUrl('/trm');
    }

    private updateTotal(): void {
        this.total.total += 1;
        this.totalesService.updateTotal(this.total);
    }
}
