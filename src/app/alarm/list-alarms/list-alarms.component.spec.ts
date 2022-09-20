import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListAlarmsComponent } from './list-alarms.component';

describe('ListAlarmsComponent', () => {
  let component: ListAlarmsComponent;
  let fixture: ComponentFixture<ListAlarmsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAlarmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAlarmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
