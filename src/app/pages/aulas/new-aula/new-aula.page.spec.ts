import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewAulaPage } from './new-aula.page';

describe('NewAulaPage', () => {
  let component: NewAulaPage;
  let fixture: ComponentFixture<NewAulaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAulaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewAulaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
