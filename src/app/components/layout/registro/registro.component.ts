import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from 'src/app/interfaces/usuario';
import { ImagesService } from 'src/app/services/images.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public registroForm: any;

  public usuario!: Usuario;

  public progress: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private usuariosServices: UsuariosService,
    private imagesService: ImagesService,
    private snackBar: MatSnackBar
  ) {
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
    this.registroForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['',[Validators.required]],
      apellido: ['',[Validators.required]],
      nombre: ['',[Validators.required]],
      email: ['',[Validators.required]],
      url_titulo: ['',[Validators.required]],
      dni: ['',[Validators.required]]
    })
  }

  registro(){
    console.log(this.registroForm.get('apellido').value)
    this.usuario.apellido = this.registroForm.get('apellido').value
    this.usuario.nombre = this.registroForm.get('nombre').value
    this.usuario.username = this.registroForm.get('username').value
    this.usuario.password = this.registroForm.get('password').value
    this.usuario.email = this.registroForm.get('email').value
    this.usuario.url_titulo = this.registroForm.get('url_titulo').value
    this.usuario.dni = this.registroForm.get('dni').value
        
    this.usuariosServices.postLogin(this.usuario).subscribe(
      response => {
        // console.log(response)
        if(response){
          this.snackBar.open('Usuario registrado correctamente','Aceptar',{duration: 2000})
        }else{
          this.snackBar.open('Ocurrio un error, intente nuevamente más tarde','Aceptar',{duration: 2000})
        }
        this.dialog.closeAll()
      },
      error => {
        this.snackBar.open('Ocurrio un error, intente nuevamente más tarde','Aceptar',{duration: 2000})
        console.log(error)
      }
    )
  }

  close(){
    this.dialog.closeAll()
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
      this.imagesService.uploadTitulo(image).subscribe(

        (event: HttpEvent<any>) =>{
          switch (event.type) {
            case HttpEventType.UploadProgress:
              this.progress = Math.round(event.loaded / event.total * 100)
              break;
            case HttpEventType.Response:
              if(event.body.statusMessage != 'existe'){
                this.registroForm.controls['url_titulo'].setValue(event.body.data)
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
