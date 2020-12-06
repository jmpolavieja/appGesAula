import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GeneraEquiposPage } from './genera-equipos.page';

describe('ModalGeneraPage', () => {
  let component: GeneraEquiposPage;
  let fixture: ComponentFixture<GeneraEquiposPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneraEquiposPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GeneraEquiposPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
