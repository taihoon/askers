import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelFormComponent } from './channel-form.component';

describe('ChannelFormComponent', () => {
  let component: ChannelFormComponent;
  let fixture: ComponentFixture<ChannelFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
