import { TestBed } from '@angular/core/testing';

import { FeedbackFormGuard } from './feedback-form.guard';

describe('FeedbackFormGuard', () => {
  let guard: FeedbackFormGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(FeedbackFormGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
