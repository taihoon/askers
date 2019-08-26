import { TestBed } from '@angular/core/testing';

import { ChannelListService } from './channel-list.service';

describe('ChannelListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChannelListService = TestBed.get(ChannelListService);
    expect(service).toBeTruthy();
  });
});
