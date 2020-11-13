import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListAulaPage } from './list-aula.page';

describe('ListAulaPage', () => {
  let component: ListAulaPage;
  let fixture: ComponentFixture<ListAulaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAulaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListAulaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
