import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsectSvg } from './insect-svg';

describe('InsectSvg', () => {
  let component: InsectSvg;
  let fixture: ComponentFixture<InsectSvg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsectSvg]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsectSvg);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
