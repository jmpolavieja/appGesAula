import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DashboardPddPage } from './dashboard-pdd.page';

describe('DashboardPddPage', () => {
  let component: DashboardPddPage;
  let fixture: ComponentFixture<DashboardPddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardPddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardPddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should nuevo-equipo', () => {
    expect(component).toBeTruthy();
  });
});
