import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalErrorComponent } from './internal-error.component';

describe('InternalErrorComponent', () => {
  let component: InternalErrorComponent;
  let fixture: ComponentFixture<InternalErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InternalErrorComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(InternalErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct text in h2', () => {
    fixture.detectChanges();
    let compiled = fixture.nativeElement as HTMLElement;
    let h2 = compiled.querySelector('h2');
    
    expect(h2?.textContent).toBe('Even Valyrian steel could not prevent this error. Something has gone wrong in the Realm');
  })
});
