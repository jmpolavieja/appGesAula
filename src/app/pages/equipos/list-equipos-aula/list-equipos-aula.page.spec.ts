import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListEquiposAulaPage } from './list-equipos-aula.page';

describe('ListEquiposAulaPage', () => {
  let component: ListEquiposAulaPage;
  let fixture: ComponentFixture<ListEquiposAulaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListEquiposAulaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListEquiposAulaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
