import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageComponent } from './landing-page.component';

describe('LandingPageComponent', () => {
  let component: LandingPageComponent;
  let fixture: ComponentFixture<LandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LandingPageComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('first h3 content should be "Valar Morghulis..."', () => {
    let h3Element = document.getElementsByTagName('h3')[0];
    expect(h3Element.textContent).toBe('Valar Morghulis...');
  });

  it('second h3 content should be "Valar Dohaeris..."', () => {
    let h3Element = document.getElementsByTagName('h3')[1];
    expect(h3Element.textContent).toBe('Valar Dohaeris...');
  })
});
