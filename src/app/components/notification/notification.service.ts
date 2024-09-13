import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { INotification } from './notification.interface';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private _notification$: Subject<INotification> = new BehaviorSubject(null);

  getNotification = () => this._notification$.asObservable();

  /**
   * Emit params to notification component
   * @param message
   * @param timeout
   * @returns
   */
  show = (message: string, timeout: number = 2000) =>
    this._notification$.next({
      message, timeout
    });


}
