import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinmaxComponent } from './minmax.component';

describe('MinmaxComponent', () => {
  let component: MinmaxComponent;
  let fixture: ComponentFixture<MinmaxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinmaxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinmaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
