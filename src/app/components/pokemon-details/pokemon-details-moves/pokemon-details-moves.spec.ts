import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonDetailsMoves } from './pokemon-details-moves';

describe('PokemonDetailsMoves', () => {
  let component: PokemonDetailsMoves;
  let fixture: ComponentFixture<PokemonDetailsMoves>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonDetailsMoves]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonDetailsMoves);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
