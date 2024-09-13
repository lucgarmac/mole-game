import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NotificationService } from './notification.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent implements OnInit, OnDestroy{

  private _stopObservable$ = new Subject();

  @Input() message: string = '';
  @Input() isVisible = false;

  constructor(private _notificationService: NotificationService) {  }

  ngOnInit() {
    this._notificationService.getNotification()
      .pipe(takeUntil(this._stopObservable$))
      .subscribe(notification => {
        this.isVisible = false;

        if(notification) {
          const{message, timeout} = notification;
          this.isVisible = true;
          this.message = message;
          setTimeout(() => {
            this.isVisible = false;
          }, timeout);
        }
      })
  }

  ngOnDestroy() {
    this._stopObservable$.next(null);
    this._stopObservable$.complete();
  }
}
