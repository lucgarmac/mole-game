import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';

import { NotificationComponent } from './notification.component';
import { NotificationService } from './notification.service';
import { of } from 'rxjs';

describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;
  let nativeElement: HTMLElement;

  let notificationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement as HTMLElement;

    notificationService = TestBed.inject(NotificationService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should notification is hidden when message is not received', fakeAsync(() => {
    const getNotificationSpy = spyOn(notificationService, 'getNotification').and.returnValue(of(null));
    fixture.detectChanges();

    expect(getNotificationSpy).toHaveBeenCalled();
    expect(component.isVisible).toBeFalsy();
    expect(nativeElement.querySelector('.alert')).toBeNull();
  }));

  it('should show a notification when message is received', () => {
    const getNotificationSpy = spyOn(notificationService, 'getNotification').and.returnValue(of({
      message: 'Test',
      timeout: 3000
    }));

    fixture.detectChanges();
    expect(getNotificationSpy).toHaveBeenCalled();
    expect(component.isVisible).toBeTruthy();
    expect(component.message).toEqual('Test');
    expect(nativeElement.querySelector('.alert')).not.toBeNull();
    expect(nativeElement.querySelector('.alert').textContent).toEqual('Test');
    setTimeout(() => {
      expect(component.isVisible).toBeFalsy();
    }, 3000);
  });

});
