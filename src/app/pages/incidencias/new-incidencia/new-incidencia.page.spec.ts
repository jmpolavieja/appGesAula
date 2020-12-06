import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {NewIncidenciaPage} from './new-incidencia.page';

describe('NewIncidenciaPage', () => {
  let component: NewIncidenciaPage;
  let fixture: ComponentFixture<NewIncidenciaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewIncidenciaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewIncidenciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
