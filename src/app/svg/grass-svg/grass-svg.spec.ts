import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrassSvg } from './grass-svg';

describe('GrassSvg', () => {
  let component: GrassSvg;
  let fixture: ComponentFixture<GrassSvg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrassSvg]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrassSvg);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
