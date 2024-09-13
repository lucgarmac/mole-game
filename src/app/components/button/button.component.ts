import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() label: string = '';
  @Input() disabled:boolean = false;

  @Output() onclick = new EventEmitter<MouseEvent>();

  onClick = (event:MouseEvent) => this.onclick.emit(event)

}
