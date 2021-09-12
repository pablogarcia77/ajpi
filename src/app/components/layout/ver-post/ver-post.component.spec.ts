import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerPostComponent } from './ver-post.component';

describe('VerPostComponent', () => {
  let component: VerPostComponent;
  let fixture: ComponentFixture<VerPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
