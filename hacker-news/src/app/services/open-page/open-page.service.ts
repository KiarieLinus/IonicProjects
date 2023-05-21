import { Injectable } from '@angular/core';
import { InAppBrowser, InAppBrowserObject } from '@awesome-cordova-plugins/in-app-browser/ngx';


@Injectable({
  providedIn: 'root'
})
export class OpenPageService {
  private inAppBrowserObject?: InAppBrowserObject | null;

  constructor(private inAppBrowser: InAppBrowser) { }

  open(url: string) {
    if (this.inAppBrowserObject) {
      this.inAppBrowserObject.close();
      this.inAppBrowserObject = null;
    }
    this.inAppBrowserObject = this.inAppBrowser.create(url,
      '_blank');
  }
}
