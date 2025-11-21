import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonCardImage } from './pokemon-details-image';

describe('PokemonCardImage', () => {
  let component: PokemonCardImage;
  let fixture: ComponentFixture<PokemonCardImage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonCardImage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonCardImage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
