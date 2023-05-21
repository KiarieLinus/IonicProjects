import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Items } from 'src/app/models/items';
import { OpenPageService } from 'src/app/services/open-page/open-page.service';


@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent implements OnInit {
  @Input() items: Items | undefined | null;
  @Output() toOpen = new EventEmitter<string>();

  ngOnInit() { }

  openPage(url: string) {
    this.toOpen.emit(url);
  }
}
