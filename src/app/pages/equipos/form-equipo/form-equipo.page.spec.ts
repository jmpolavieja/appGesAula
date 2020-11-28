import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormEquipoPage } from './form-equipo.page';

describe('CreatePage', () => {
  let component: FormEquipoPage;
  let fixture: ComponentFixture<FormEquipoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormEquipoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormEquipoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should form-equipo', () => {
    expect(component).toBeTruthy();
  });
});
