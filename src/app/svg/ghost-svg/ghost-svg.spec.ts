import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GhostSvg } from './ghost-svg';

describe('GhostSvg', () => {
  let component: GhostSvg;
  let fixture: ComponentFixture<GhostSvg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GhostSvg]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GhostSvg);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
