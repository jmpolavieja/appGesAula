import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AsignaEquiposPage } from './asigna-equipos.page';

describe('AsignaEquiposPage', () => {
  let component: AsignaEquiposPage;
  let fixture: ComponentFixture<AsignaEquiposPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignaEquiposPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AsignaEquiposPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
