import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommentsPageRoutingModule } from './comments-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { CommentsPage } from './comments.page';

import { reducers } from './reducers';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CommentsEffects } from './effects/comments';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommentsPageRoutingModule,
    ComponentsModule,
    StoreModule.forFeature('comments', reducers),
    EffectsModule.forFeature([CommentsEffects]),
  ],
  declarations: [CommentsPage]
})
export class CommentsPageModule { }
