import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonRefresher } from '@ionic/angular';
import { IonRefresherCustomEvent } from '@ionic/core';
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
  private infiniteScrollComponent: any;
  private refresherComponent: any;
  private onRefresh = true;

  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.subscription = this.itemService.get()
      .subscribe(items => {
        if (this.onRefresh) {
          this.items = items;
          this.notifyRefreshComplete();
        } else {
          this.items?.push(...items);
          this.notifyScrollComplete();
        }
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

  load(event: Event) {
    this.infiniteScrollComponent = event.target;
    if (this.hasNext()) {
      this.next();
    }
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

  refresh(event: Event) {
    this.refresherComponent = event.target;
    if (this.canRefresh()) {
      this.doRefresh();
    }
  }
  doRefresh() {
    this.onRefresh = true;
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

  private notifyScrollComplete(): void {
    if (this.infiniteScrollComponent) {
      this.infiniteScrollComponent.complete();
    }
  }

  private notifyRefreshComplete(): void {
    this.onRefresh = false;
    if (this.refresherComponent) {
      this.refresherComponent.complete();
    }
  }

}
