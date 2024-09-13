import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SquareComponent } from './square.component';

describe('SquareComponent', () => {
  let component: SquareComponent;
  let fixture: ComponentFixture<SquareComponent>;
  let nativeElement: HTMLElement;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SquareComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SquareComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement as HTMLElement;

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should mole image isn\'t visible when the flag is activated', () => {
    component.isVisibleMole = false;
    fixture.detectChanges();
    expect(nativeElement.querySelector('img')).toBeNull();
  });

  it('should  mole image is visible when the flag is activated', () => {
    component.isVisibleMole = true;
    fixture.detectChanges();
    expect(nativeElement.querySelector('img')).not.toBeNull();
  });
});
