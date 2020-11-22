import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Usuario} from "../../../models/usuario";
import {UsersService} from "../../../services/data/users.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.page.html',
  styleUrls: ['./user-list.page.scss'],
})
export class UserListPage implements OnInit {

  public userList: Observable<Usuario[]>;

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.userList = this.usersService.getUserList();
  }

}
