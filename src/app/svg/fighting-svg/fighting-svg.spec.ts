import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FightingSvg } from './fighting-svg';

describe('FightingSvg', () => {
  let component: FightingSvg;
  let fixture: ComponentFixture<FightingSvg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FightingSvg]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FightingSvg);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
