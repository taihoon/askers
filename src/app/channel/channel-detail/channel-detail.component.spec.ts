import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelDetailComponent } from './channel-detail.component';

describe('ChannelDetailComponent', () => {
  let component: ChannelDetailComponent;
  let fixture: ComponentFixture<ChannelDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
