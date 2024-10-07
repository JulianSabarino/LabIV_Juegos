import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlappybeeComponent } from './flappybee.component';

describe('FlappybeeComponent', () => {
  let component: FlappybeeComponent;
  let fixture: ComponentFixture<FlappybeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlappybeeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlappybeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
