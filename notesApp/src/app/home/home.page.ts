import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NoteListComponent } from './ui/note-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  template: `
    <ion-header mode="md" [translucent]="true" class="ion-no-border">
      <ion-toolbar color="buttons">
        <ion-title> Notes </ion-title>
        <ion-buttons slot="secondary">
          <ion-button mode="ios" size="large">
            <ion-icon src="../../assets/search.svg"></ion-icon>
          </ion-button>
          <ion-button mode="ios" size="large">
            <ion-icon src="../../assets/info.svg"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content [fullscreen]="false">
      <ng-container *ngIf="false; else elseTemplate">
        <app-note-list></app-note-list>
      </ng-container>

      <ng-template #elseTemplate>
        <div class="no-notes-img">
          <ion-img src="../../assets/rafiki.svg" alt="No notes"></ion-img>
        </div>
      </ng-template>
      <ion-fab slot="fixed" vertical="bottom" horizontal="end">
        <ion-fab-button color="buttons" mode="ios">
          <ion-icon name="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  `,
  styles: [
    `
      ion-header {
        padding-bottom: 1em;
        ion-toolbar {
          ion-title {
            font-size: 2.6875em;
            font-weight: 600;
          }

          ion-buttons {
            margin: 0;
            gap: 1em;
            padding-right: 1em;
          }

          ion-button {
            background: #3b3b3b;
            background-clip: border-box;
            border-radius: 1em;
          }

          ion-icon {
            padding: 0.53125em 0.21875em;
          }
        }
      }

      ion-content {
        ion-fab {
          margin-bottom: var(--ion-safe-area-bottom, 0);
        }

        .no-notes-img {
          height: 90%;
          display: flex;
          margin: auto;
          justify-content: center;
        }
      }
    `,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NoteListComponent, IonicModule, CommonModule],
})
export class HomePage {
  constructor() {}
}
