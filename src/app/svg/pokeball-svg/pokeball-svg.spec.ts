import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokeballSvg } from './pokeball-svg';

describe('PokeballSvg', () => {
  let component: PokeballSvg;
  let fixture: ComponentFixture<PokeballSvg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokeballSvg]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokeballSvg);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
