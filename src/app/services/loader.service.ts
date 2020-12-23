import {Injectable} from '@angular/core';
import {LoadingController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  // Añadimos variable booleana para evitar error de carga de loading
  isLoading = false;

  constructor(public loadingCtrl: LoadingController) { }

  // Mstrar el loader por tiempo indefinido
  async showLoader() {
    this.isLoading = true;
    return await this.loadingCtrl.create({
      message: 'Please wait...'
    }).then((res) => {
      res.present().then(() => {
        if(!this.isLoading) {
          res.dismiss().then(() => console.log('Loading abortado'));
        }
      });
    });
  }

  // Terminar el loader creado
  async hideLoader() {
    this.isLoading = false;
    return await this.loadingCtrl.dismiss().then((res) => {
      console.log('Loading dismissed!', res);
    }).catch((error) => {
      console.log('error', error);
    });
  }
}
