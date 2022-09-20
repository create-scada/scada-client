import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CreateAlarmComponent } from './create-alarm.component';

describe('CreateAlarmComponent', () => {
  let component: CreateAlarmComponent;
  let fixture: ComponentFixture<CreateAlarmComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAlarmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAlarmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
