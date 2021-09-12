import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Curso } from 'src/app/interfaces/curso';
import { CursosService } from 'src/app/services/cursos.service';

@Component({
  selector: 'app-nuevo-curso',
  templateUrl: './nuevo-curso.component.html',
  styleUrls: ['./nuevo-curso.component.css']
})
export class NuevoCursoComponent implements OnInit {

  public editMode: boolean = false

  public cursoForm: any

  public curso: Curso

  constructor(
    private formBuilder: FormBuilder,
    private cursosService: CursosService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    @Optional()@Inject(MAT_DIALOG_DATA)
    public data: {curso: Curso}
  ) {
    if(this.data != undefined){
      console.log('hay curso')
      this.curso = this.data.curso
      this.editMode = true
    }else{
      this.curso = new Curso()
    }
  }

  ngOnInit(): void {
    let curse = (this.editMode) ? this.curso.curso : ''
    this.cursoForm = this.formBuilder.group({
      curso: [curse,[Validators.required]]
    })
  }

  publicarEditar(){
    
    this.curso.curso = this.cursoForm.get('curso').value
    
    if(this.editMode){
      this.cursosService.putCurso(this.curso).subscribe(
        response => {
          if(response){
            this.snackBar.open('Curso modificado correctamente!', 'Aceptar', {duration: 1500})
          }else{
            this.snackBar.open('Ocurrio un error, intente nuevamente', 'Aceptar', {duration: 1500})
          }
          this.dialog.closeAll()
        }
      )
    }else{
      this.cursosService.postCurso(this.curso).subscribe(
        response => {
          if(response){
            this.snackBar.open('Curso agregado correctamente!', 'Aceptar', {duration: 1500})
          }else{
            this.snackBar.open('Ocurrio un error, intente nuevamente', 'Aceptar', {duration: 1500})
          }
          this.dialog.closeAll()
        }
      )
    }
  }
}
