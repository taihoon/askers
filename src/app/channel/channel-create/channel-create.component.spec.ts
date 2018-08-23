import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelCreateComponent } from './channel-create.component';

describe('ChannelCreateComponent', () => {
  let component: ChannelCreateComponent;
  let fixture: ComponentFixture<ChannelCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
