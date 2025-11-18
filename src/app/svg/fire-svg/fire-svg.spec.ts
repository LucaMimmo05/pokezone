import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FireSVG } from './fire-svg';

describe('FireSVG', () => {
  let component: FireSVG;
  let fixture: ComponentFixture<FireSVG>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FireSVG]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FireSVG);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
