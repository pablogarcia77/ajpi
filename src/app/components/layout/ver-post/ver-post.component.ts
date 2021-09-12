import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Publicacion } from 'src/app/interfaces/publicacion';
import { PublicacionesService } from 'src/app/services/publicaciones.service';

@Component({
  selector: 'app-ver-post',
  templateUrl: './ver-post.component.html',
  styleUrls: ['./ver-post.component.css']
})
export class VerPostComponent implements OnInit {

  public publicacion: Publicacion

  constructor(
    private publicacionesService: PublicacionesService,
    private activatedRouter: ActivatedRoute
  ) {
    this.publicacion = new Publicacion()
  }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(
      response => {
        this.publicacionesService.getPublicacion(response.id).subscribe(
          response => {
            this.publicacion = response[0]
          }
        )
      }
    )
  }

}
