import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, CanActivateFn, provideRouter, Router, RouterStateSnapshot } from '@angular/router';

import { authGuard } from './auth.guard';
import { PlayerService } from '../services/player.service';
import { HomeComponent } from '../pages/home/home.component';

describe('authGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
      TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([{path: '**', component: HomeComponent}]),
      ]
    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should redirect to home when there isn\'t a user', () => {
    const playerService = TestBed.inject(PlayerService);
    const activatedRoute = TestBed.inject(ActivatedRoute);
    const navigateSpy = spyOn(TestBed.inject(Router), 'navigate')

    playerService.userData = {username: '', points: 0};
    const guardResponse = executeGuard(activatedRoute.snapshot, {} as RouterStateSnapshot)

    expect(guardResponse).toBeFalsy();
    expect(navigateSpy).toHaveBeenCalledOnceWith(['/home']);
  });
});
