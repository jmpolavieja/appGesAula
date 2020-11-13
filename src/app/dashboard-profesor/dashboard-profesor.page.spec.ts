import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DashboardProfesorPage } from './dashboard-profesor.page';

describe('DashboardProfesorPage', () => {
  let component: DashboardProfesorPage;
  let fixture: ComponentFixture<DashboardProfesorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardProfesorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardProfesorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
