import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fire2Svg } from './fire2-svg';

describe('Fire2Svg', () => {
  let component: Fire2Svg;
  let fixture: ComponentFixture<Fire2Svg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Fire2Svg]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Fire2Svg);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
