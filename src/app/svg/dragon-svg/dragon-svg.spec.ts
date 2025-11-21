import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragonSvg } from './dragon-svg';

describe('DragonSvg', () => {
  let component: DragonSvg;
  let fixture: ComponentFixture<DragonSvg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DragonSvg]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DragonSvg);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
