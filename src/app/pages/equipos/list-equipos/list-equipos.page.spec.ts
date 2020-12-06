import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {ListEquiposPage} from './list-equipos.page';

describe('ListEquiposPage', () => {
  let component: ListEquiposPage;
  let fixture: ComponentFixture<ListEquiposPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListEquiposPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListEquiposPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should form-equipo', () => {
    expect(component).toBeTruthy();
  });
});
