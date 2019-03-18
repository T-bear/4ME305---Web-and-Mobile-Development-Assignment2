import { TestBed } from '@angular/core/testing';

import { MapsService } from 'src/app/services/map.service';

describe('MapService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MapsService = TestBed.get(MapsService);
    expect(service).toBeTruthy();
  });
});
