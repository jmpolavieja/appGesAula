import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { LoadingController, AlertController } from "@ionic/angular";
import { FirestoreService } from "../../../services/data/firestore.service";

import { IonicModule } from '@ionic/angular';

import { CreatePageRoutingModule } from './create-routing.module';

import { CreatePage } from './create.page';
import {DashboardPraPageModule} from "../../dashboards/dashboard-pra/dashboard-pra.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CreatePageRoutingModule,
        ReactiveFormsModule,
        DashboardPraPageModule
    ],
  declarations: [CreatePage]
})
export class CreatePageModule {}
