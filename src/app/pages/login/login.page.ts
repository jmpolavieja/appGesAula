import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {NavController} from "@ionic/angular";
import firebase from "firebase";




@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private email: string;
  password: any;

  constructor() {
  }


  ngOnInit() {
  }


  login() {

  }
}
