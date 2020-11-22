import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DashboardPraPage } from './dashboard-pra.page';

describe('DashboardPraPage', () => {
  let component: DashboardPraPage;
  let fixture: ComponentFixture<DashboardPraPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardPraPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardPraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should nuevo-equipo', () => {
    expect(component).toBeTruthy();
  });
});
