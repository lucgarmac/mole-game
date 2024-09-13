import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement as HTMLElement;

    component.disabled = false;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should button is disabled when disabled prop is true', () => {
    component.disabled = true;
    fixture.detectChanges();

    expect(nativeElement.querySelector('button').getAttribute('disabled')).not.toBeNull();
  });

  it('should emits mouse event when button is clicked', () => {
    const clickSpy = spyOn(component.onclick, 'emit');
    fixture.detectChanges();

    component.onClick(new MouseEvent(''));
    expect(clickSpy).toHaveBeenCalled();

  });

  it('should text in button when label input is received', () => {
    component.label = 'Test';
    fixture.detectChanges();

    expect(nativeElement.querySelector('button').textContent).toEqual('Test');
  });

});
