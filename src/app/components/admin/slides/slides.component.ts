import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Slide } from 'src/app/interfaces/slide';
import { SlidesService } from 'src/app/services/slides.service';
import { NuevoSlideComponent } from '../nuevo-slide/nuevo-slide.component';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.css']
})
export class SlidesComponent implements OnInit {

  public dataSource: MatTableDataSource<Slide>

  public displayedColumns: string[] = ['id', 'slide', 'estado', 'mostrar']

  @ViewChild(MatSort, {static: false}) sort!: MatSort
  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator
  
  constructor(
    private slidesService: SlidesService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {

  }

  ngOnInit(): void {
    this.slidesService.getSlides().subscribe(
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

  habilitarSlide(slide: Slide){
    this.slidesService.changeState(slide).subscribe(
      response => {
        if(response){
          if(slide.estado){
            this.snackBar.open('Se mostrará la imagen','Aceptar',{duration: 1500})
          }else{
            this.snackBar.open('Se dejó de mostrar la imagen','Aceptar',{duration: 1500})
          }
        }else{
          this.snackBar.open('Ocurrio un error, intente nuevamente','Aceptar',{duration: 1500})
        }
      }
    )
  }

  nuevoSlide(){
    this.dialog.open(NuevoSlideComponent)
  }

}
