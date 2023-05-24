import { Component, Input } from '@angular/core';
import { Item } from 'src/app/models/item';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent {
  @Input() item?: Item;

  constructor(private router: Router) { }

  openComments(id: number) {
    this.router.navigateByUrl(`/comments/${id}`)
  }
}
