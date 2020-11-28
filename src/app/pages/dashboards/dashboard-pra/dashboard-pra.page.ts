import {Component, OnInit} from '@angular/core';
import firebase from "firebase";

@Component({
    selector: 'app-dashboard-pra',
    templateUrl: './dashboard-pra.page.html',
    styleUrls: ['./dashboard-pra.page.scss'],
})
export class DashboardPraPage implements OnInit {

    public num = 30;
    public aula = 7;
    public numInc = 2;

    constructor() {
    }

    ngOnInit() {
    }

    logout() {
        firebase.auth().signOut();
    }
}
