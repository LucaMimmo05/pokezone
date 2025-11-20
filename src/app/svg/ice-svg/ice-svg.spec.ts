import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IceSvg } from './ice-svg';

describe('IceSvg', () => {
  let component: IceSvg;
  let fixture: ComponentFixture<IceSvg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IceSvg]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IceSvg);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
