import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FooterComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 3 links', () => {
    fixture.detectChanges();
    let compiled = fixture.nativeElement as HTMLElement;
    let links = compiled.querySelectorAll('a');

    expect(links.length).toBe(3);
  })

  it('should have the correct text in "p"', () => {
    fixture.detectChanges();
    let compiled = fixture.nativeElement as HTMLElement;
    let p = compiled.querySelector('p');

    expect(p?.textContent).toBe('"Winter is Coming"');
  })
});
