import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectricSvg } from './electric-svg';

describe('ElectricSvg', () => {
  let component: ElectricSvg;
  let fixture: ComponentFixture<ElectricSvg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElectricSvg]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElectricSvg);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
