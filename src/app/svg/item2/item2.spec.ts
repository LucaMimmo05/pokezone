import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Item2 } from './item2';

describe('Item2', () => {
  let component: Item2;
  let fixture: ComponentFixture<Item2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Item2]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Item2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
