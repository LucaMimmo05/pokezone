import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonDetailsPhysicalInfo } from './pokemon-details-physical-info';

describe('PokemonDetailsInfo', () => {
  let component: PokemonDetailsPhysicalInfo;
  let fixture: ComponentFixture<PokemonDetailsPhysicalInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonDetailsPhysicalInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonDetailsPhysicalInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
