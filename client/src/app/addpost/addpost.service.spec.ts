import { TestBed } from '@angular/core/testing';

import { AddPostService } from './addpost.service';

describe('AddpostService', () => {
  let service: AddPostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddPostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
