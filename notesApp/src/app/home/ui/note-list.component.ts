import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-note-list',
  template: `
    <ion-list mode="ios" [inset]="true" *ngFor="let item of items">
      <ion-item-sliding>
        <ion-item
          [style.--background]="item.color"
          [button]="true"
          detail="false"
        >
          <ion-label>
            <strong>Rick Astley</strong>
            <ion-text>Never Gonna Give You Up</ion-text><br />
            <ion-note color="medium" class="ion-text-wrap">
              Never gonna give you up Never gonna let you down Never gonna
              run...
            </ion-note>
          </ion-label>
          <div class="metadata-end-wrapper" slot="end">
            <ion-note color="medium">0{{ item.time }}:11</ion-note>
            <ion-icon color="medium" name="chevron-forward"></ion-icon>
          </div>
        </ion-item>
        <ion-item-options slot="end">
          <ion-item-option color="danger" expandable="true">
            <ion-icon slot="icon-only" name="trash"></ion-icon>
          </ion-item-option>
        </ion-item-options>
      </ion-item-sliding>
    </ion-list>
  `,
  styles: [``],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class NoteListComponent implements OnInit {
  items = Array(8)
    .fill(0)
    .map((_x, i) => ({
      time: i + 1,
      color: '#fffb07f3',
    }));
  constructor() {}

  ngOnInit() {}
}
