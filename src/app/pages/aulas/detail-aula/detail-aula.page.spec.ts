import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailAulaPage } from './detail-aula.page';

describe('DetailAulaPage', () => {
  let component: DetailAulaPage;
  let fixture: ComponentFixture<DetailAulaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailAulaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailAulaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
