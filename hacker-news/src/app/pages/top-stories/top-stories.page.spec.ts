import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TopStoriesPage } from './top-stories.page';
import { ItemsComponent } from 'src/app/components/items/items.component';
import { ItemComponent } from 'src/app/components/item/item.component';
import { TimeAgoPipe } from 'src/app/components/time-ago/time-ago.pipe';
import { IonicModule } from '@ionic/angular';
import { ItemService } from 'src/app/services/item/item.service';
import { ItemServiceMock } from 'src/app/testing/ItemServiceMock';
import { By } from '@angular/platform-browser';

describe('TopStoriesPage', () => {
  let component: TopStoriesPage;
  let fixture: ComponentFixture<TopStoriesPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ItemsComponent, ItemComponent, TimeAgoPipe, TopStoriesPage],
      imports: [IonicModule.forRoot()],
      providers: [{ provide: ItemService, useClass: ItemServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(TopStoriesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should display a list of ten items', waitForAsync(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      let debugElements = fixture.debugElement.queryAll(By.css('h2'));
      expect(debugElements.length).toBe(10)
      expect(debugElements[0].nativeElement.textContent).toContain('Item 1');
      expect(debugElements[1].nativeElement.textContent).toContain('Item 2');
    });
  }));
});
