import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonDetailsWeaknesses } from './pokemon-details-weaknesses';

describe('PokemonDetailsWeaknesses', () => {
  let component: PokemonDetailsWeaknesses;
  let fixture: ComponentFixture<PokemonDetailsWeaknesses>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonDetailsWeaknesses]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonDetailsWeaknesses);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
