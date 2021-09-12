import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Slide } from 'src/app/interfaces/slide';
import { ImagesService } from 'src/app/services/images.service';
import { SlidesService } from 'src/app/services/slides.service';

@Component({
  selector: 'app-nuevo-slide',
  templateUrl: './nuevo-slide.component.html',
  styleUrls: ['./nuevo-slide.component.css']
})
export class NuevoSlideComponent implements OnInit {


  public progress: number = 0

  public slideForm: any

  public slide: Slide

  constructor(
    private imagesService: ImagesService,
    private slidesService: SlidesService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.slide = new Slide()
  }

  ngOnInit(): void {
    this.slideForm = this.formBuilder.group({
      slide: ['',[Validators.required]]
    })
  }

  nuevoSlide(){
    this.slidesService.postSlide(this.slide).subscribe(
      response => {
        if(response){
          this.snackBar.open('Imagen subida correctamente','Aceptar',{duration:2000})
          this.router.navigate([''])
        }else{
          this.snackBar.open('Ocurrio un error, intente nuevamente','Aceptar',{duration:2000})
        }
        this.dialog.closeAll()
      }
    )
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
              if(event.body.statusMessage != 'existe'){
                this.slideForm.controls['slide'].setValue(event.body.data)
                this.slide.slide = event.body.data
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
