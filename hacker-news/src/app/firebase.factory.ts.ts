import { NgZone } from '@angular/core';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';

import { environment } from 'src/environments/environment';

export function HackerNews() {
    return provideFirebaseApp(() => initializeApp(environment.hackernews_db))
}