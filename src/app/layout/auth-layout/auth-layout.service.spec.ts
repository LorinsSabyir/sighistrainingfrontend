import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { AuthLayoutService } from './auth-layout.service';

describe('AuthLayoutService', () => {
  let service: AuthLayoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(AuthLayoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save and clear the access token', () => {
    service.saveAccessToken('test-token');

    expect(service.getAccessToken()).toBe('test-token');

    service.clearSession();

    expect(service.getAccessToken()).toBeNull();
  });
});
