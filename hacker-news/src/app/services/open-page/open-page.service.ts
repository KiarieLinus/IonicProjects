import { Injectable } from '@angular/core';
import {
  InAppBrowser,
  InAppBrowserObject,
  InAppBrowserEvent,
} from '@awesome-cordova-plugins/in-app-browser/ngx';
import { AlertController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OpenPageService {
  private browser?: InAppBrowserObject | null;
  private loading?: HTMLIonAlertElement;
  private subscription?: Subscription | null;

  constructor(
    private inAppBrowser: InAppBrowser,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {}

  open(url: string) {
    this.cancel().then(() => {
      this.browser = this.inAppBrowser.create(url, '_blank', {
        location: 'no',
        hidden: 'yes',
      });

      this.subscription = this.browser
        .on('loadstart')
        .subscribe(() => this.showLoading());

      this.subscription.add(
        this.browser.on('loadstop').subscribe(() => {
          this.hideLoading().then(() => this.browser?.show());
        })
      );

      this.subscription.add(
        this.browser
          .on('loaderror')
          .subscribe((event) => this.handleError(event))
      );

      this.subscription.add(
        this.browser.on('exit').subscribe(() => this.cleanup())
      );
    });
  }

  private async showLoading(): Promise<void> {
    const loading = await this.alertCtrl.create({
      header: 'Opening...',
      message:
        'The page is loading. You can press the Cancel button to stop it.',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Cancel',
          handler: this.cancel.bind(this),
        },
      ],
    });
    this.loading = loading;
    return await loading.present();
  }
  private hideLoading(): Promise<boolean> {
    if (this.loading) {
      return this.loading.dismiss();
    } else {
      return Promise.resolve(true);
    }
  }
  private cancel(): Promise<boolean | void> {
    return this.hideLoading().then(this.cleanup.bind(this));
  }

  private handleError(event: InAppBrowserEvent): Promise<void> {
    return this.showError(event).then(this.cleanup.bind(this));
  }

  private async showError(event: InAppBrowserEvent): Promise<void> {
    await this.hideLoading();
    const toast = await this.toastCtrl.create({
      message: `Failed to load the page. Code: ${event.code},
   Message: ${event.message}`,
      duration: 3000,
      buttons: [
        {
          text: 'Dismiss',
          role: 'cancel',
        },
      ],
      layout: 'stacked',
    });
    return await toast.present();
  }

  private cleanup() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
    if (this.browser) {
      this.browser.close();
      this.browser = null;
    }
  }
}
