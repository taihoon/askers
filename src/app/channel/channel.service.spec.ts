import { TestBed, inject } from '@angular/core/testing';

import { ChannelService } from './channel.service';

describe('ChannelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChannelService]
    });
  });

  it('should be created', inject([ChannelService], (service: ChannelService) => {
    expect(service).toBeTruthy();
  }));
});
