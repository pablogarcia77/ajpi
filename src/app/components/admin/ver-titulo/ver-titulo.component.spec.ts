import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerTituloComponent } from './ver-titulo.component';

describe('VerTituloComponent', () => {
  let component: VerTituloComponent;
  let fixture: ComponentFixture<VerTituloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerTituloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerTituloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
