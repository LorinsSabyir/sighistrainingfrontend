import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthLayout } from './auth-layout';

describe('AuthLayout', () => {
  let component: AuthLayout;
  let fixture: ComponentFixture<AuthLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthLayout],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the login experience', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('app-auth-brand')).toBeTruthy();
    expect(compiled.querySelector('app-login-form')).toBeTruthy();
  });
});
