import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateVertragComponent } from './update-vertrag.component';

describe('UpdateVertragComponent', () => {
  let component: UpdateVertragComponent;
  let fixture: ComponentFixture<UpdateVertragComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateVertragComponent]
    });
    fixture = TestBed.createComponent(UpdateVertragComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
