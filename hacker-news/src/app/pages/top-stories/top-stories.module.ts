import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { TopStoriesPageRoutingModule } from './top-stories-routing.module';
import { TopStoriesPage } from './top-stories.page';

import { reducers as topStoriesReducers } from './reducers';
import { StoreModule } from '@ngrx/store';
import { TopStoriesEffects } from './effects/top-stories';
import { EffectsModule } from '@ngrx/effects';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TopStoriesPageRoutingModule,
    ComponentsModule,
    StoreModule.forFeature('topStories', topStoriesReducers),
    EffectsModule.forFeature([TopStoriesEffects]),
  ],
  declarations: [TopStoriesPage]
})
export class TopStoriesPageModule { }
