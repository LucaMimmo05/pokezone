import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonDetailsType } from './pokemon-details-type';

describe('PokemonDetailsType', () => {
  let component: PokemonDetailsType;
  let fixture: ComponentFixture<PokemonDetailsType>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonDetailsType]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonDetailsType);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
