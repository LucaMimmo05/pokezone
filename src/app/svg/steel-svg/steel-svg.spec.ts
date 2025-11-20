import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SteelSvg } from './steel-svg';

describe('SteelSvg', () => {
  let component: SteelSvg;
  let fixture: ComponentFixture<SteelSvg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SteelSvg]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SteelSvg);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
