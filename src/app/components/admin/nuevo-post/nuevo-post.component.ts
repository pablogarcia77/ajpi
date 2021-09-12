import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import 'quill-emoji/dist/quill-emoji.js'
import { Publicacion } from 'src/app/interfaces/publicacion';
import { ImagesService } from 'src/app/services/images.service';
import { PublicacionesService } from 'src/app/services/publicaciones.service';



@Component({
  selector: 'app-nuevo-post',
  templateUrl: './nuevo-post.component.html',
  styleUrls: ['./nuevo-post.component.css']
})
export class NuevoPostComponent implements OnInit {
  
  public postForm: any

  public publicacion: Publicacion
  
  public editMode: boolean = false
  
  public progress: number = 0;

  // public modules = {}
  
  constructor(
    private formBuilder: FormBuilder,
    private publicacionesService: PublicacionesService,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private imagesService: ImagesService
    ) {
    this.publicacion = new Publicacion()
    // Quill.register('modules/imageResize', ImageResize)
    
  }
  
  ngOnInit(): void {
    
    // this.modules = {
    //   imageResize: true,
    // }

    this.activatedRouter.params.subscribe(
      response => {
        this.publicacionesService.getPublicacion(response.id).subscribe(
          response => {
            this.publicacion = response[0]
            if(response[0] != undefined){
              this.editMode = true
              this.postForm.controls['titulo'].setValue(this.publicacion.titulo)
              this.postForm.controls['url_imagen'].setValue(this.publicacion.url_imagen)
              this.postForm.controls['contenido'].setValue(this.publicacion.contenido)
            }
          }
        )
      }
    )

    this.postForm = this.formBuilder.group({
      titulo: ['',[Validators.required]],
      url_imagen: ['',[Validators.required]],
      contenido: ['',[Validators.required]],
    })

    
  }

  initForm(){
    
  }

  publicarEditar(){
  
    let publicacion = {
      titulo: this.postForm.get('titulo').value,
      url_imagen: this.postForm.get('url_imagen').value,
      contenido: this.postForm.get('contenido').value,
      id: (this.publicacion != undefined) ? this.publicacion.id : undefined
    }

    if(this.editMode){
      this.publicacionesService.putPublicacion(publicacion).subscribe(
        response => {
          if (response){
            this.snackBar.open('Publicación editada correctamente','Aceptar',{duration:1500})
            setTimeout(() => {
              this.router.navigate(['publicaciones'])
            }, 2000);
          }else{
            this.snackBar.open('Ocurrio un error, intente nuevamente','Aceptar',{duration:1500})
          }
        }
      )
    }else{
      this.publicacionesService.postPublicacion(publicacion).subscribe(
        response => {
          console.log(response)
          if (response){
            this.snackBar.open('Publicación agregada correctamente','Aceptar',{duration:1500})
            setTimeout(() => {
              this.router.navigate(['publicaciones'])
            }, 2000);
          }else{
            this.snackBar.open('Ocurrio un error, intente nuevamente','Aceptar',{duration:1500})
          }
        }
      )
    }
  }

  readThis(event: any): void {
    let file: File = event.target.files[0];
    let myReader: FileReader = new FileReader();
    myReader.readAsDataURL(file);
    myReader.onloadend = e => {
      let image = {
        "encodedImage": myReader.result
      };

      // console.log(image)
      this.imagesService.uploadImage(image).subscribe(

        (event: HttpEvent<any>) =>{
          switch (event.type) {
            case HttpEventType.UploadProgress:
              this.progress = Math.round(event.loaded / event.total * 100)
              break;
            case HttpEventType.Response:
              console.log(event.body)
              if(event.body.statusMessage != 'existe'){
                this.postForm.controls['url_imagen'].setValue(event.body.data)
                this.snackBar.open('Imagen cargada correctamente','Aceptar',{duration: 2000})
              }else{
                this.snackBar.open('Imagen invalida, use otra','Aceptar',{duration: 2000})
              }
              this.progress = 0
          }
        }


      )
    }
  }


}
