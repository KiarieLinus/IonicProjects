import {
  ChangeDetectionStrategy, Component, OnInit, OnDestroy
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import * as fromItems from '../../reducers/items';
import * as fromComments from './reducers';
import * as commentsActions from './actions/comments';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Items } from '../../models/items';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./comments.page.scss'],
})
export class CommentsPage implements OnInit, OnDestroy {
  items$: Observable<Items>;
  private itemsLoading$: Observable<boolean>;
  private infiniteScrollComponent: any;
  private subscriptions: Subscription[];

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromComments.State>,
    private location: Location
  ) {
    this.items$ = store.pipe(select(fromComments.
      getSelectedItemChildren)) as Observable<Items>;

    this.itemsLoading$ = store.pipe(select(fromItems.
      isItemsLoading));
    this.subscriptions = [];
  }

  ngOnInit() {
    this.subscriptions.push(this.itemsLoading$.
      subscribe(loading => {
        if (!loading) {
          this.notifyScrollComplete();
        }
      }));
    this.subscriptions.push(this.route.params.pipe(
      map(params => new commentsActions.Select(parseInt(params['id'], 10)))
    ).subscribe(this.store));

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.
      unsubscribe());
  }

  load(event: Event) {
    this.infiniteScrollComponent = event.target;
    this.store.dispatch(new commentsActions.LoadMore());
  }

  goBack(): void {
    this.location.back();
  }

  private notifyScrollComplete(): void {
    if (this.infiniteScrollComponent) {
      this.infiniteScrollComponent.complete();
    }
  }

}
