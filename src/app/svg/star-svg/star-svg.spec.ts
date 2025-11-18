import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarSVG } from './star-svg';

describe('StarSVG', () => {
  let component: StarSVG;
  let fixture: ComponentFixture<StarSVG>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarSVG]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StarSVG);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
