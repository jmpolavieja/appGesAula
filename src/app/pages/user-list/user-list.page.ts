import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Usuario} from "../../models/usuario";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.page.html',
  styleUrls: ['./user-list.page.scss'],
})
export class UserListPage implements OnInit {

  public userList: Observable<Usuario[]>;

  constructor() { }

  ngOnInit() {
  }

}
