import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselDot } from './carousel-dot';

describe('CarouselDot', () => {
  let component: CarouselDot;
  let fixture: ComponentFixture<CarouselDot>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselDot]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarouselDot);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
