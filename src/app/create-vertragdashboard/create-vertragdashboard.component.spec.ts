import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVertragdashboardComponent } from './create-vertragdashboard.component';

describe('CreateVertragdashboardComponent', () => {
  let component: CreateVertragdashboardComponent;
  let fixture: ComponentFixture<CreateVertragdashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateVertragdashboardComponent]
    });
    fixture = TestBed.createComponent(CreateVertragdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
