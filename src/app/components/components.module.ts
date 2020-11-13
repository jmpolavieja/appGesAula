import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TituloPageComponent} from "./titulo-page/titulo-page.component";
import {NumEquiposComponent} from "./num-equipos/num-equipos.component";
import {IonicModule} from "@ionic/angular";
import {NotificacionComponent} from "./notificacion/notificacion.component";


@NgModule({
    declarations: [
        TituloPageComponent,
        NumEquiposComponent,
        NotificacionComponent
    ],
    imports: [
        CommonModule,
        IonicModule
    ],
    exports: [
        TituloPageComponent,
        NumEquiposComponent,
        NotificacionComponent
    ]
})
export class ComponentsModule {
}
