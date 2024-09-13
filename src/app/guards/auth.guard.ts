import { CanActivateFn, Router } from '@angular/router';
import { PlayerService } from '../services/player.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const playerService = inject(PlayerService);
  const router = inject(Router);

  const {username} = playerService.userData;
  if(!username) {
    return router.navigate(['/home']);
  }

  return true;
};
