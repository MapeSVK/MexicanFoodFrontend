import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MealsUpdateComponent } from './meals-update.component';

describe('MealsUpdateComponent', () => {
  let component: MealsUpdateComponent;
  let fixture: ComponentFixture<MealsUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MealsUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MealsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
