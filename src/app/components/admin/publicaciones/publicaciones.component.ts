import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Publicacion } from 'src/app/interfaces/publicacion';
import { PublicacionesService } from 'src/app/services/publicaciones.service';

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.css']
})
export class PublicacionesComponent implements OnInit {

  public dataSource: MatTableDataSource<Publicacion>

  public displayedColumns: string[] = ['id', 'titulo','fecha','estado', 'acciones']

  @ViewChild(MatSort, {static: false}) sort!: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;

  constructor(
    private publicacionesService: PublicacionesService,
    private snackBar: MatSnackBar,
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.publicacionesService.getPublicaciones().subscribe(
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

  publicar(publicacion: Publicacion){
    this.publicacionesService.changeState(publicacion).subscribe(
      response => {
        if(response){
          if(publicacion.estado){
            this.snackBar.open('La publicación ahora es visible','Aceptar',{duration:1500})
          }else{
            this.snackBar.open('La publicación ya no está visible','Aceptar',{duration:1500})
          }
        }else{
          this.snackBar.open('Ocurrio un error, intente nuevamente','Aceptar',{duration:1500})
        }
      }
    )
  }
}
