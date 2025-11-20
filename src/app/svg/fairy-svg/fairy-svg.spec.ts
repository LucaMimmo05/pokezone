import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FairySvg } from './fairy-svg';

describe('FairySvg', () => {
  let component: FairySvg;
  let fixture: ComponentFixture<FairySvg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FairySvg]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FairySvg);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
