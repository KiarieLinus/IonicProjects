import { NgModule, NgZone, PLATFORM_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ServicesModule } from './services/services.module';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/compat/database';
import { environment } from 'src/environments/environment';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ServicesModule,
    AngularFireModule.initializeApp(environment.app_db),
    AngularFireDatabaseModule,
  ],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
