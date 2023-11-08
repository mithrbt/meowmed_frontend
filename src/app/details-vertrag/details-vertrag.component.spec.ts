import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsVertragComponent } from './details-vertrag.component';

describe('DetailsVertragComponent', () => {
  let component: DetailsVertragComponent;
  let fixture: ComponentFixture<DetailsVertragComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsVertragComponent]
    });
    fixture = TestBed.createComponent(DetailsVertragComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
