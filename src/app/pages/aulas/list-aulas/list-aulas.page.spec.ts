import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListAulasPage } from './list-aulas.page';

describe('ListAulasPage', () => {
  let component: ListAulasPage;
  let fixture: ComponentFixture<ListAulasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAulasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListAulasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
