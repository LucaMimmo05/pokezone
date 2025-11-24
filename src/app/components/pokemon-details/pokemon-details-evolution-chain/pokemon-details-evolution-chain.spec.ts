import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonDetailsEvolutionChain } from './pokemon-details-evolution-chain';

describe('PokemonDetailsEvolutionChain', () => {
  let component: PokemonDetailsEvolutionChain;
  let fixture: ComponentFixture<PokemonDetailsEvolutionChain>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonDetailsEvolutionChain]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonDetailsEvolutionChain);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
