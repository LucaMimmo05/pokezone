import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NormalSvg } from './normal-svg';

describe('NormalSvg', () => {
  let component: NormalSvg;
  let fixture: ComponentFixture<NormalSvg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NormalSvg]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NormalSvg);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
