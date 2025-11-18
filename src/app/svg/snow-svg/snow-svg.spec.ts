import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnowSVG } from './snow-svg';

describe('SnowSVG', () => {
  let component: SnowSVG;
  let fixture: ComponentFixture<SnowSVG>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnowSVG]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnowSVG);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
