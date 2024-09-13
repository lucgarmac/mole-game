import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { GameService } from './game.service';
import { CONFIG_LEVELS } from '../config/game.config';

describe('GameService', () => {
  let service: GameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getLevelBoard should fill the game board', () => {
    service.getLevelBoard();
    expect(service.board.length).toBeGreaterThan(0);
  });

  it('updateLevel should change current config game level', () => {
    service.updateLevel('medium');
    expect(service.currentConfigLevel).toEqual(CONFIG_LEVELS.medium);
  });

  it('updateMoles should change total visible moles in the game', () => {
    service.updateMoles(3);
    expect(service.currentConfigLevel.moles).toEqual(3);
  });

  it('should create a game board and add moles when invoke start method', () => {

    service.start();
    setTimeout(() => {
    expect(service.board.length).toBeGreaterThan(0);
      expect(service.board.some(row => row.some(col => col === 'M'))).toBeTruthy();
    }, service.currentConfigLevel.timeShowMoleinMillis);
    service.stop();

    expect(service.board.some(row => row.some(col => col === 'M'))).toBeFalsy();

  });

  it('should update points when position contains a mole', () => {
    service.getLevelBoard();
    const board = service.board;
    board[0][0] = 'M';
    const expected = {
      row: 0,
      col: 0,
      points: service.currentConfigLevel.points
    }
    expect(service.checkCell(0,0)).toEqual(expected);
  });
});
