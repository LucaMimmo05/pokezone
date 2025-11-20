import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterSvg } from './water-svg';

describe('WaterSvg', () => {
  let component: WaterSvg;
  let fixture: ComponentFixture<WaterSvg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaterSvg]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaterSvg);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
