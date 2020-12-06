import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
/*
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';
*/

import {UserListPageRoutingModule} from './list-users-routing.module';

import {ListUsersPage} from './list-users.page';
import {DashboardPraPageModule} from "../../dashboards/dashboard-pra/dashboard-pra.module";
import {SharedModule} from "../../../shared/shared.module";

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        /*FormsModule,
        IonicModule,*/
        UserListPageRoutingModule,
        DashboardPraPageModule
    ],
  declarations: [ListUsersPage]
})
export class UserListPageModule {}
