import { TestBed } from '@angular/core/testing';

import { DatacountsService } from './datacounts.service';

describe('DatacountsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatacountsService = TestBed.get(DatacountsService);
    expect(service).toBeTruthy();
  });
});
