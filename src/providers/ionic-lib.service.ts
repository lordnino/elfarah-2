import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from 'ionic-angular';

@Injectable()
export class IonicLibraryService{

  constructor(
    private alertController: AlertController,
    private loadingController: LoadingController,
    private toastController: ToastController
  ){

  }

  basicAlert(title: string, subTitle: string, buttons: any[]){
    let alert = this.alertController.create({
      title: title,
      subTitle: subTitle,
      buttons: buttons
    });
    alert.present();
  }

  promptAlert(title: string, inputs: any[], buttons: any[], message?: string){
    let prompt = this.alertController.create({
      title: title,
      message: message,
      inputs: inputs,
      buttons: buttons,
    });
    prompt.present();
  }

  confirmationAlert(title: string, message: string, buttons: any[]){
    let confirm = this.alertController.create({
      title: title,
      message: message,
      buttons: buttons
    });
    confirm.present();
  }

  loading(content: string, dismissOnPageChange: boolean = true){
    let loader = this.loadingController.create({
      content: content,
      //duration: duration,
      dismissOnPageChange: dismissOnPageChange
    });
    loader.present();
  }

  basictoast(message: string, duration: number, position: string, cssClass?: string){
    let toast = this.toastController.create({
      message: message,
      duration: duration,
      position: position,
      cssClass: cssClass
    });
    toast.present();
  }

  showToastWithCloseButton(message: string, closeButtonText: string){
    let toast = this.toastController.create({
      message: message,
      closeButtonText: closeButtonText
    })
    toast.present();
  }
}
