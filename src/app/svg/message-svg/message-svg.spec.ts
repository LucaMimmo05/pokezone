import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageSVG } from './message-svg';

describe('MessageSVG', () => {
  let component: MessageSVG;
  let fixture: ComponentFixture<MessageSVG>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageSVG]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageSVG);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
