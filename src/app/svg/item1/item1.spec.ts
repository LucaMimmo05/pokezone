import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Item1 } from './item1';

describe('Item1', () => {
  let component: Item1;
  let fixture: ComponentFixture<Item1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Item1]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Item1);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
