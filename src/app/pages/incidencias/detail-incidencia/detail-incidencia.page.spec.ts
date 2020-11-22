import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailIncidenciaPage } from './detail-incidencia.page';

describe('DetailIncidenciaPage', () => {
  let component: DetailIncidenciaPage;
  let fixture: ComponentFixture<DetailIncidenciaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailIncidenciaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailIncidenciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
