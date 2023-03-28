import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputComponnetComponent } from './input-componnet.component';

describe('InputComponnetComponent', () => {
  let component: InputComponnetComponent;
  let fixture: ComponentFixture<InputComponnetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputComponnetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputComponnetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
