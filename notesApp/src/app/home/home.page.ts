import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class HomePage {
  items = Array(8)
    .fill(0)
    .map((_x, i) => ({
      time: i + 1,
      color: '#fffb07f3',
    }));

  constructor() {
    console.log(this.items);
  }
}
