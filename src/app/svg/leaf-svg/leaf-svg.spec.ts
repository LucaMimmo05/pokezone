import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeafSVG } from './leaf-svg';

describe('LeafSVG', () => {
  let component: LeafSVG;
  let fixture: ComponentFixture<LeafSVG>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeafSVG]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeafSVG);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
