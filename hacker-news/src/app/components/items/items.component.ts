import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item';
import { Items } from 'src/app/models/items';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent implements OnInit {
  @Input() items: Items | undefined | null;
  constructor() { }

  ngOnInit() { }

}
