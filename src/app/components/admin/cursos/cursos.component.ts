import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Curso } from 'src/app/interfaces/curso';
import { CursosService } from 'src/app/services/cursos.service';
import { NuevoCursoComponent } from '../nuevo-curso/nuevo-curso.component';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  public dataSource: MatTableDataSource<Curso>

  public displayedColumns: string[] = ['id', 'curso','fecha','estado', 'habilita_certificado', 'acciones']

  @ViewChild(MatSort, {static: false}) sort!: MatSort
  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator

  constructor(
    private cursosService: CursosService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.cursosService.getCursos().subscribe(
      response => {
        this.dataSource = new MatTableDataSource(response)
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator
      }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  habilitarCurso(curso: Curso){
    this.cursosService.changeStateCurso(curso).subscribe(
      response => {
        if(response){
          if(curso.estado){
            this.snackBar.open('Se publicó el curso','Aceptar',{duration:1500})
          }else{
            this.snackBar.open('Se cambio el estado del curso a borrador','Aceptar',{duration:1500})
          }
        }else{
          this.snackBar.open('Ocurrio un error, intente nuevamente','Aceptar',{duration:1500})
        }
      }
    )
  }

  nuevoCurso(){
    this.dialog.open(NuevoCursoComponent)
  }

  editarCurso(curso: Curso){
    this.dialog.open(
      NuevoCursoComponent,
      {
        data: {
          curso: curso
        }
      }
    )
  }

  habilitarCertificado(curso: Curso){
    this.cursosService.habilitarCertificado(curso).subscribe(
      response => {
        if(response){
          if(curso.habilita_certificado){
            this.snackBar.open('Se habilitaron los certificados del curso','Aceptar',{duration: 1500})
          }else{
            this.snackBar.open('Se deshabilitaron los certificados del curso','Aceptar',{duration: 1500})
          }
        }else{
          this.snackBar.open('Ocurrio un error, intente nuevamente','Aceptar',{duration: 1500})
        }
      }
    )
  }

}
