/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PostSubscribeService } from './post-subscribe.service';

describe('Service: PostSubscribe', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostSubscribeService]
    });
  });

  it('should ...', inject([PostSubscribeService], (service: PostSubscribeService) => {
    expect(service).toBeTruthy();
  }));
});
