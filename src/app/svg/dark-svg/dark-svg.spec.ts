import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DarkSvg } from './dark-svg';

describe('DarkSvg', () => {
  let component: DarkSvg;
  let fixture: ComponentFixture<DarkSvg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DarkSvg]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DarkSvg);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
