import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoSlideComponent } from './nuevo-slide.component';

describe('NuevoSlideComponent', () => {
  let component: NuevoSlideComponent;
  let fixture: ComponentFixture<NuevoSlideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoSlideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
