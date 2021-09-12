import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { InscripcionesService } from 'src/app/services/inscripciones.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.css']
})
export class InscripcionComponent implements OnInit {

  public dataSource: MatTableDataSource<Usuario>

  public socios: Array<Usuario>

  public cursoId: number;

  public inscriptos: Array<any>

  public displayedColumns: string[] = ['username','apellido','nombre','dni','acciones'];
  
  @ViewChild(MatSort, {static: false}) sort!: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;
  
  constructor(
    private usuariosService: UsuariosService,
    private inscripcionesService: InscripcionesService,
    private activatedRouter: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource();
    this.socios = new Array<Usuario>();
    this.inscriptos = new Array<any>()
  }

  ngOnInit(): void {
    this.usuariosService.getUsuarios().subscribe(
      response => {
        this.socios = response
        this.dataSource = new MatTableDataSource(this.socios)
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator
      }
    )
    this.activatedRouter.params.subscribe(
      response => {
        this.cursoId = response.id
        this.inscripcionesService.getInscripcionesCurso(this.cursoId).subscribe(
          response => {
            this.inscriptos = response
          }
        )
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


  eliminar(array: any, number: number){
    array.forEach((element,index) => {
      if(element == number) array.splice(index,1)
    });
  }

  inscribir(event: any, socio: Usuario){
    if(event.checked){
      this.inscripcionesService.inscribirSocio(socio.id,this.cursoId).subscribe(
        response => {
          if(response){
            this.snackBar.open('Socio inscripto', 'Aceptar', {duration: 2000})
          }else{
            this.snackBar.open('Ocurrio un error, intente nuevamente', 'Aceptar', {duration: 2000})
          }
        }
      )
    }else{
      this.inscripcionesService.removerInscripcion(socio.id,this.cursoId).subscribe(
        response => {
          if(response){
            this.snackBar.open('Se elimino la inscripción', 'Aceptar', {duration: 2000})
          }else{
            this.snackBar.open('Ocurrio un error, intente nuevamente', 'Aceptar', {duration: 2000})
          }
        }
      )
    }
    
  }

  estaInscripto(socio: Usuario): boolean{
    return (this.inscriptos.find(e => e.socio === socio.id) != undefined) ? true : false
  }

}
