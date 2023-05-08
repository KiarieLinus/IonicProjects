import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { TimeAgoPipe } from '../time-ago/time-ago.pipe';
import { ItemsComponent } from './items.component';
import { ItemComponent } from '../item/item.component';
import { By } from '@angular/platform-browser';


describe('ItemsComponent', () => {
  let component: ItemsComponent;
  let fixture: ComponentFixture<ItemsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ItemsComponent, ItemComponent, TimeAgoPipe],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should display a list of items', () => {
    component.items = [
      {
        id: 1,
        title: 'Test item 1',
        url: 'http://www.example.com/test1',
        by: 'user1',
        time: 1478576387,
        score: 242,
      },
      {
        id: 2,
        title: 'Test item 2',
        url: 'http://www.example.com/test2',
        by: 'user2',
        time: 1478576387,
        score: 100,
      }]

    fixture.detectChanges();
    const debugElements = fixture.debugElement.queryAll(By.
      css('h2'));
    expect(debugElements.length).toBe(2);
    expect(debugElements[0].nativeElement.textContent).
      toContain('Test item 1');
    expect(debugElements[1].nativeElement.textContent).
      toContain('Test item 2');

  });

  it('should display no items', () => {
    component.items = []
    fixture.detectChanges();
    const debugElement = fixture.debugElement.query(By.css('p'));
    expect(debugElement).not.toBeNull();
    expect(debugElement.nativeElement.textContent).
      toContain('No items');
  });

});
