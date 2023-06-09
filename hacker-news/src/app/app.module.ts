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
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ItemsEffects } from './effects/items';
import { CustomRouterStateSerializer, reducers } from './reducers';

import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';

import { provideFirebaseApp, initializeApp, getApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { Project1AngularFireAuth } from './firebase.factory.ts';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ServicesModule,
    AngularFireModule.initializeApp(environment.hackernews_db),
    AngularFireDatabaseModule,
    provideFirebaseApp(() => initializeApp(environment.app_db, 'auth')),
    provideAuth(() => getAuth(getApp('auth'))),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([ItemsEffects]),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router'
    }),
  ],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
    InAppBrowser,
    {
      provide: RouterStateSerializer, useClass:
        CustomRouterStateSerializer
    },
    {
      provide: 'project1Auth',
      useFactory: Project1AngularFireAuth
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
