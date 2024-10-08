import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskmagicComponent } from './askmagic.component';

describe('AskmagicComponent', () => {
  let component: AskmagicComponent;
  let fixture: ComponentFixture<AskmagicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AskmagicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AskmagicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
