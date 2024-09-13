import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  UntypedFormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonComponent } from '../../components/button/button.component';
import { CommonModule } from '@angular/common';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, ButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  form: UntypedFormGroup;

  constructor(
    private readonly builder: FormBuilder,
    private readonly _router: Router,
    private readonly _playerService: PlayerService
  ) {}

  private _loadForm = () => {
    this.form = this.builder.group({
      username: ['', [Validators.required, this.usernameValid]],
    });
  }

  private usernameValid = (control: AbstractControl): ValidationErrors | null => {
    if(!control.value?.trim().length) {
      return {required: true}
    }
    return null;
  }

  onAccessGame = () => {
    if (this.form.valid) {
      this._playerService.updateUsername(this.form.get('username').value);
      this._router.navigate(['game']);
    }
  }

  ngOnInit() {
    this._loadForm();
  }

}
