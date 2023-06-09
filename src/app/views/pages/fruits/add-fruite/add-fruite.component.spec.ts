import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFruiteComponent } from './add-fruite.component';

describe('AddFruiteComponent', () => {
  let component: AddFruiteComponent;
  let fixture: ComponentFixture<AddFruiteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddFruiteComponent]
    });
    fixture = TestBed.createComponent(AddFruiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
