import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileFilter } from './mobile-filter';

describe('MobileFilter', () => {
  let component: MobileFilter;
  let fixture: ComponentFixture<MobileFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileFilter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileFilter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
