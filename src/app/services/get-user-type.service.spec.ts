import { TestBed } from '@angular/core/testing';

import { GetUserTypeService } from './get-user-type.service';

describe('GetUserTypeService', () => {
  let service: GetUserTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetUserTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
