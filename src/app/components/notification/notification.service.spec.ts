import { TestBed } from '@angular/core/testing';

import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit notification data', () => {
    const nextSpy = spyOn(service['_notification$'], 'next');
    service.show('Test',3000);

    expect(nextSpy).toHaveBeenCalled();
  });
});
