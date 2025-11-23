import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrowSvg } from './arrow-svg';

describe('ArrowSvg', () => {
  let component: ArrowSvg;
  let fixture: ComponentFixture<ArrowSvg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArrowSvg]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArrowSvg);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
