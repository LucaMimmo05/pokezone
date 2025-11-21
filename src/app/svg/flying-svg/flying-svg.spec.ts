import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlyingSvg } from './flying-svg';

describe('FlyingSvg', () => {
  let component: FlyingSvg;
  let fixture: ComponentFixture<FlyingSvg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlyingSvg]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlyingSvg);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
