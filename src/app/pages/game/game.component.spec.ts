import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameService } from '../../services/game.service';
import { PlayerService } from '../../services/player.service';
import { GameComponent } from './game.component';
import { NotificationService } from './../../components/notification/notification.service';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  let playerService;
  let gameService;
  let notificationService;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();

    playerService = TestBed.inject(PlayerService);
    gameService = TestBed.inject(GameService);
    notificationService = TestBed.inject(NotificationService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load player info and game board', () => {
    spyOnProperty(playerService, 'userData', 'get').and.returnValue({
      username: 'Test',
      points: 0
    });
    const getLevelBoardSpy = spyOn(gameService, 'getLevelBoard');
    fixture.detectChanges();

    expect(getLevelBoardSpy).toHaveBeenCalled();
    expect(component.username()).toEqual('Test');
    expect(component.playerPoints()).toEqual(0);
  });

  it('should init game when Play button is clicked', () => {
    const startSpy = spyOn(gameService, 'start');

    component.onStartGame();

    expect(startSpy).toHaveBeenCalled();
    expect(component.isStartedGame()).toBeTruthy();

  });

  it('should stop game when Stop button is clicked', () => {
    spyOnProperty(playerService, 'userData', 'get').and.returnValue({
      username: 'Test',
      points: 0
    });
    const stopSpy = spyOn(gameService, 'stop');
    const resetPointsSpy =  spyOn(playerService, 'resetPoints').and.returnValue({username: 'Test', points: 0})

    fixture.detectChanges();
    component.onStopGame();

    expect(stopSpy).toHaveBeenCalled();
    expect(resetPointsSpy).toHaveBeenCalled();
    expect(component.isStartedGame()).toBeFalsy();
    expect(component.playerPoints()).toBe(0);

  });

  it('should update player points and show notification when square clicked contains a mole', () => {
    const checkCellSpy = spyOn(gameService, 'checkCell').and.returnValue({
      row: 0,
      col: 0,
      points: 10
    });
    const addPointsSpy = spyOn(playerService, 'addPoints').and.returnValue({
      username: 'Test',
      points: 10
    });
    const showSpy = spyOn(notificationService,'show');
    const vibrateSpy = spyOn(window.navigator, 'vibrate');
    spyOnProperty(playerService, 'userData', 'get').and.returnValue({
      username: 'Test',
      points: 10
    });
    fixture.detectChanges();
    component.onSquareClick(0,0);

    expect(checkCellSpy).toHaveBeenCalled();
    expect(addPointsSpy).toHaveBeenCalled();
    expect(showSpy).toHaveBeenCalled();
    expect(vibrateSpy).toHaveBeenCalled();
    expect(component.squareSelected).not.toBeNull();
    expect(component.playerPoints()).toBeGreaterThan(0);

    setTimeout(() => {
      expect(component.squareSelected).toBeNull();
    }, 400);
  });

  it('should change visible moles when moles selector is changed', () => {
    const stopSpy = spyOn(gameService,'stop');
    const updateLevelSpy = spyOn(gameService,'updateLevel');
    const updateMolesSpy = spyOn(gameService,'updateMoles');
    const startSpy = spyOn(gameService,'start');

    fixture.detectChanges();
    component.onStartGame();
    expect(startSpy).toHaveBeenCalled();
    expect(component.isStartedGame()).toBeTruthy();

    component.onLevelChange('medium');

    expect(stopSpy).toHaveBeenCalled();
    expect(updateLevelSpy).toHaveBeenCalledWith('medium');
    expect(updateMolesSpy).toHaveBeenCalled();
    expect(startSpy).toHaveBeenCalled();
    expect(component.levelOption()).toEqual('medium');
  });

  it('should change level when level selector is changed', () => {
    const updateMolesSpy = spyOn(gameService,'updateMoles');

    fixture.detectChanges();
    component.onNumMolesChange(2);

    expect(updateMolesSpy).toHaveBeenCalledWith(2);
    expect(component.numMolesOption()).toBeGreaterThan(0);
  });
});
