import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Curso } from 'src/app/interfaces/curso';
import { Usuario } from 'src/app/interfaces/usuario';
import { CursosService } from 'src/app/services/cursos.service';
import { InscripcionesService } from 'src/app/services/inscripciones.service';
import { CertificadoComponent } from '../certificado/certificado.component';

@Component({
  selector: 'app-cursos-usuario',
  templateUrl: './cursos-usuario.component.html',
  styleUrls: ['./cursos-usuario.component.css']
})
export class CursosUsuarioComponent implements OnInit {

  public usuario: Usuario

  public cursos: Array<any>

  constructor(
    private inscripcionesService: InscripcionesService,
    private dialog: MatDialog
  ) {
    this.usuario = new Usuario()
    this.cursos = new Array<any>()
  }

  ngOnInit(): void {

    this.usuario = JSON.parse(localStorage.getItem('usuario'))

    this.inscripcionesService.getInscripcionesSocio(this.usuario).subscribe(
      response => {
        this.cursos = response
      }
    )
  }

  verCertificado(curso: Curso){
    this.dialog.open(
      CertificadoComponent,{
        data: {
          curso: curso,
          socio: this.usuario
        },
        width: '100%'
      }
    )
  }

}
