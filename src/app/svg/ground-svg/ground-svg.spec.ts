import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroundSvg } from './ground-svg';

describe('GroundSvg', () => {
  let component: GroundSvg;
  let fixture: ComponentFixture<GroundSvg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroundSvg]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroundSvg);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
