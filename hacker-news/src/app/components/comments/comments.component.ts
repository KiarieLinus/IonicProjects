import { Component, Input, OnInit } from '@angular/core';
import { Items } from 'src/app/models/items';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent {
  @Input() items?: Items | null;
}
