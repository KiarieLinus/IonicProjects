import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ItemComponent } from './item/item.component';
import { TimeAgoPipe } from './time-ago/time-ago.pipe';
import { ItemsComponent } from './items/items.component';
import { CommentComponent } from './comment/comment.component';
import { CommentsComponent } from './comments/comments.component';


@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    ItemComponent,
    TimeAgoPipe,
    ItemsComponent,
    CommentComponent,
    CommentsComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [ItemsComponent]
})
export class ComponentsModule { }