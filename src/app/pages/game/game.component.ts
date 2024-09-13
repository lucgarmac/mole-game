import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { ButtonComponent } from '../../components/button/button.component';
import { NotificationService } from '../../components/notification/notification.service';
import { SquareComponent } from '../../components/square/square.component';
import { GameService } from '../../services/game.service';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    SquareComponent,
    ButtonComponent,
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent implements OnInit {
  iconUser = faUser;

  username = signal<string>('');
  levelOption = signal<string>('low');
  numMolesOption = signal<number>(1);
  playerPoints = signal<number>(0);

  isStartedGame = signal<boolean>(false);
  squareSelected = null;

  constructor(
    private readonly _playerService: PlayerService,
    private readonly _notificationService: NotificationService,
    protected gameService: GameService
  ) {
  }

  private _loadUserInfo = () => {
    const { username, points } = this._playerService.userData;
    this.username.set(username);
    this.playerPoints.set(points);
  }

  onLevelChange = (level: string) => {
    this.levelOption.set(level);
    this.gameService.stop();
    this.gameService.updateLevel(level);
    this.gameService.updateMoles(this.numMolesOption());
    if(this.isStartedGame()) {
      this.gameService.start();
    }
  }

  onNumMolesChange = (numMoles: number) => {
    this.numMolesOption.set(numMoles);
    this.gameService.updateMoles(numMoles);
  }

  onSquareClick = (row: number, column: number) => {
    this.squareSelected = this.gameService.checkCell(row, column);
    if(this.squareSelected?.points > 0) {
      this._playerService.addPoints(this.squareSelected.points);

      const {points} = this._playerService.userData;
      this.playerPoints.set(points);

      setTimeout(() => {
        this.squareSelected = null;
      }, 400);
      window.navigator.vibrate(300);
      this._notificationService.show('Good job!');
    }
  }

  onStartGame = () => {
    this.isStartedGame.set(true);
    this.gameService.start();
  }

  onStopGame = () => {
    this.isStartedGame.set(false)
    this._playerService.resetPoints();
    const { points } = this._playerService.userData;
    this.playerPoints.set(points)
    this.gameService.stop();
  }

  ngOnInit() {
    this._loadUserInfo();
    this.gameService.getLevelBoard();
  }
}
