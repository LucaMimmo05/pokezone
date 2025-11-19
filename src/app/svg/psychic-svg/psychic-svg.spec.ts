import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsychicSvg } from './psychic-svg';

describe('PsychicSvg', () => {
  let component: PsychicSvg;
  let fixture: ComponentFixture<PsychicSvg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PsychicSvg]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PsychicSvg);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
