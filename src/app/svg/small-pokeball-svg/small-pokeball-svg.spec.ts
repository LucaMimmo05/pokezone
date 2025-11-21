import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallPokeballSvg } from './small-pokeball-svg';

describe('SmallPokeballSvg', () => {
  let component: SmallPokeballSvg;
  let fixture: ComponentFixture<SmallPokeballSvg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmallPokeballSvg]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmallPokeballSvg);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
