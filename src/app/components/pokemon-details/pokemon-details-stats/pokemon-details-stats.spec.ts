import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonDetailsStats } from './pokemon-details-stats';

describe('PokemonDetailsStats', () => {
  let component: PokemonDetailsStats;
  let fixture: ComponentFixture<PokemonDetailsStats>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonDetailsStats]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonDetailsStats);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
