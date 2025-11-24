import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonDetailsTitle } from './pokemon-details-title';

describe('PokemonDetailsTitle', () => {
  let component: PokemonDetailsTitle;
  let fixture: ComponentFixture<PokemonDetailsTitle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonDetailsTitle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonDetailsTitle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
