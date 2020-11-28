import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DashboardTrmPage } from './dashboard-trm.page';

describe('DashboardTrmPage', () => {
  let component: DashboardTrmPage;
  let fixture: ComponentFixture<DashboardTrmPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardTrmPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardTrmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should form-equipo', () => {
    expect(component).toBeTruthy();
  });
});
