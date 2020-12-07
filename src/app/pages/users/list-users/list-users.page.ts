import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {UsuarioInterface} from "../../../interfaces/usuarioInterface";
import {UsersService} from "../../../services/data/users.service";

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.page.html',
  styleUrls: ['./list-users.page.scss'],
})
export class ListUsersPage implements OnInit {

  public userList: Observable<UsuarioInterface[]>;

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.userList = this.usersService.getUserList();
  }

}
