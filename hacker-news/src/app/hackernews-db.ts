import { AngularFireDatabase } from '@angular/fire/compat/database'
import { InjectionToken } from '@angular/core'

export const HACKER_NEWS_DB = new InjectionToken<AngularFireDatabase>('Hacker News db')