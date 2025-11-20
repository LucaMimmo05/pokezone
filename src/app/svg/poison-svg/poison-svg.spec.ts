import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoisonSvg } from './poison-svg';

describe('PoisonSvg', () => {
  let component: PoisonSvg;
  let fixture: ComponentFixture<PoisonSvg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoisonSvg]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoisonSvg);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
