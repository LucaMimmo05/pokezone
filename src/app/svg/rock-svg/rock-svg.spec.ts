import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RockSvg } from './rock-svg';

describe('RockSvg', () => {
  let component: RockSvg;
  let fixture: ComponentFixture<RockSvg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RockSvg]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RockSvg);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
