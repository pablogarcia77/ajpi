import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursosUsuarioComponent } from './cursos-usuario.component';

describe('CursosUsuarioComponent', () => {
  let component: CursosUsuarioComponent;
  let fixture: ComponentFixture<CursosUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CursosUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CursosUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
