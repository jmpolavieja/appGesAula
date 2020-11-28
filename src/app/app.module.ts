import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';

/*  imports de firebase */
import {AngularFireModule} from "@angular/fire";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {firebaseConfig} from "./credentials";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {ToolbarComponent} from "./components/toolbar/toolbar.component";
import {InfoCardComponent} from "./components/info-card/info-card.component";


@NgModule({
    declarations: [
        AppComponent,
        ToolbarComponent,
        InfoCardComponent
    ],
    entryComponents: [],
    imports: [BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFirestoreModule,
        AngularFireAuthModule
    ],
    exports: [
        ToolbarComponent,
        InfoCardComponent
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
