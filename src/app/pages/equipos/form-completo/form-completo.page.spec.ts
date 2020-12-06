import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormCompletoPage } from './form-completo.page';

describe('FormCompletoPage', () => {
  let component: FormCompletoPage;
  let fixture: ComponentFixture<FormCompletoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCompletoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormCompletoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
