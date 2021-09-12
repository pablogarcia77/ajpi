import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Publicacion } from 'src/app/interfaces/publicacion';
import { PublicacionesService } from 'src/app/services/publicaciones.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator
  obs: Observable<any>
  dataSource: MatTableDataSource<Publicacion>

  public publicaciones: Array<Publicacion>

  constructor(
    private publicacionesService: PublicacionesService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.publicaciones = new Array<Publicacion>()
    
  }

  ngOnInit(): void {
    this.publicacionesService.getPublicacionesTrue().subscribe(
      response => {
        // console.log(response)
        this.changeDetectorRef.detectChanges();
        this.dataSource = new MatTableDataSource<Publicacion>(response)
        this.dataSource.paginator = this.paginator
        this.obs = this.dataSource.connect()
      }
    )
  }

}
