import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {ListIncidenciasPage} from './list-incidencias.page';

describe('ListIncidenciasPage', () => {
  let component: ListIncidenciasPage;
  let fixture: ComponentFixture<ListIncidenciasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListIncidenciasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListIncidenciasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
