import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private _userDataDefault = {
    username: '',
    points: 0,
  };

  private _userData = null;

  constructor() {
    this._userData =
      JSON.parse(localStorage.getItem('user')) || this._userDataDefault;
  }

  /**
   * Get username and points of the player
   * @returns
   */
  get userData() {
    return this._userData || null;
  }

  /**
   * Update username and points of the player
   */
  set userData(value) {
    this._userData = value;
  }
  /**
   * Update player username and save in local storage
   * @param username
   */
  updateUsername = (username: string = '') => {
    this._userData = {
      ...this._userData,
      username,
    };
    localStorage.setItem('user', JSON.stringify(this._userData));
  };

  /**
   * Remove player data
   */
  resetUser = () => {
    localStorage.setItem('user', JSON.stringify(this._userDataDefault));
    this._userData = JSON.parse(localStorage.getItem('user'));
  };

  /**
   * Update player points
   * @param points
   */
  addPoints = (points: number) => {
    this._userData = {
      ...this._userData,
      points: this._userData.points + points,
    };
    localStorage.setItem('user', JSON.stringify(this._userData));
  };

  /**
   * Clear the player current points
   */
  resetPoints = () => {
    this._userData = {
      ...this._userData,
      points: 0,
    };
    localStorage.setItem('user', JSON.stringify(this._userData));
  };
}
