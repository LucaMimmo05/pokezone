import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropSVG } from './drop-svg';

describe('DropSVG', () => {
  let component: DropSVG;
  let fixture: ComponentFixture<DropSVG>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropSVG]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropSVG);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
