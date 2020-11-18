import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { LoadingController, AlertController } from "@ionic/angular";
import { FirestoreService } from "../../services/data/firestore.service";

import { IonicModule } from '@ionic/angular';

import { CreatePageRoutingModule } from './create-routing.module';

import { CreatePage } from './create.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CreatePageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [CreatePage]
})
export class CreatePageModule {}
