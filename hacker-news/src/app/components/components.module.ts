import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ItemComponent } from './item/item.component';
import { TimeAgoPipe } from './time-ago/time-ago.pipe';
import { ItemsComponent } from './items/items.component';


@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [ItemComponent, TimeAgoPipe, ItemsComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
})
export class ComponentsModule { }

/**
 * remove the schema
 */