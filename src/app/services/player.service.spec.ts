import { TestBed } from '@angular/core/testing';

import { PlayerService } from './player.service';

describe('PlayerService', () => {
  let service: PlayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('resetUser should restore to default player data', () => {
    service.resetUser();
    expect(service.userData).toEqual(service['_userDataDefault']);
  });

  it('updateUsername should change player username', () => {
    service.updateUsername('Test');
    const playerNameExpected = 'Test';
    expect(service.userData.username).toBe(playerNameExpected);
  });

  it('resetPoints should restore player points', () => {
    service.resetPoints();
    expect(service.userData.points).toBe(0);
  });

  it('addPoints should increment current player points with received points', () => {
    service.userData = {
      username: '',
      points: 0
    }
    service.addPoints(10);
    const playerPointsExpected = 10;
    expect(service.userData.points).toEqual(playerPointsExpected);
  });
});
