import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SparkSVG } from './spark-svg';

describe('SparkSVG', () => {
  let component: SparkSVG;
  let fixture: ComponentFixture<SparkSVG>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SparkSVG]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SparkSVG);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
