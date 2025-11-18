import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LightningSVG } from './lightning-svg';

describe('LightningSVG', () => {
  let component: LightningSVG;
  let fixture: ComponentFixture<LightningSVG>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LightningSVG]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LightningSVG);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
