import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Items } from 'src/app/models/items';
import { ItemService } from 'src/app/services/item/item.service';

@Component({
  selector: 'app-top-stories',
  templateUrl: './top-stories.page.html',
  styleUrls: ['./top-stories.page.scss'],
})
export class TopStoriesPage implements OnInit, OnDestroy {
  items?: Items;
  private subscription?: Subscription;
  private offset = 0;
  private limit = 10;

  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.subscription = this.itemService.get()
      .subscribe(items => {
        this.items = items
      });
    this.doLoad(true);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  hasPrevious(): boolean {
    return this.offset > 0;
  }

  previous() {
    if (!this.hasPrevious()) {
      return;
    }
    this.offset -= this.limit;
    this.doLoad(false);
  }

  hasNext(): boolean {
    return this.items != null && (this.offset + this.limit) <
      this.itemService.total;
  }

  next() {
    if (!this.hasNext()) {
      return;
    }
    this.offset += this.limit;
    this.doLoad(false);
  }

  canRefresh(): boolean {
    return this.items != null;
  }

  refresh() {
    if (!this.canRefresh()) {
      return;
    }
    this.offset = 0;
    this.doLoad(true);
  }

  private doLoad(refresh: boolean) {
    this.itemService.load({
      offset: this.offset,
      limit: this.limit,
      refresh
    });
  }
}
