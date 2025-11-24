import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonDetailsAbilities } from './pokemon-details-abilities';

describe('PokemonDetailsAbilities', () => {
  let component: PokemonDetailsAbilities;
  let fixture: ComponentFixture<PokemonDetailsAbilities>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonDetailsAbilities]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonDetailsAbilities);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
