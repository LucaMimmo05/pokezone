import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokeballShadow } from './pokeball-shadow';

describe('PokeballShadow', () => {
  let component: PokeballShadow;
  let fixture: ComponentFixture<PokeballShadow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokeballShadow]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokeballShadow);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
