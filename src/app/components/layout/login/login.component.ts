import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { ImagesService } from 'src/app/services/images.service';
import { LoginService } from 'src/app/services/login.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { RegistroComponent } from '../registro/registro.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public progress: number = 0;

  public loginForm: any;

  public usuario: Usuario;

  public error: boolean = false;

  public bloqueado: boolean = false;

  public image: any;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private dialog: MatDialog,
    private router: Router,
    private imageService: ImagesService,
    private usuariosService: UsuariosService,
    private snackBar: MatSnackBar
  ) {
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
    this.emptyForm()
    this.usuario = localStorage.getItem('usuario') ? JSON.parse(localStorage.getItem('usuario')) : null
  }

  emptyForm(){
    this.loginForm = this.formBuilder.group({
      username: ['',[Validators.required]],
      password: ['',[Validators.required]]
    })
  }
  login(){
    let usuario = {
      username: this.loginForm.get('username').value,
      password: this.loginForm.get('password').value
    }

    // console.log(usuario)

    this.loginService.postLogin(usuario).subscribe(
      response => {
        if(response){
          if(response.estado){
            this.usuario = response
            // console.log(this.usuario)
            localStorage.setItem('usuario',JSON.stringify(this.usuario))
            this.error = false
            this.bloqueado = false
          }else{
            this.bloqueado = true
          }
        }else{
          this.error = true
        }
      }
    )
  }

  registro(){
    this.dialog.open(RegistroComponent)
  }

  logout(){
    localStorage.removeItem('usuario')
    this.usuario = null
    this.emptyForm()
    this.router.navigate([''])
  }

  readThis(event: any,tipo: any): void {
    let file: File = event.target.files[0];
    let myReader: FileReader = new FileReader();
    myReader.readAsDataURL(file);
    myReader.onloadend = e => {
      this.image = myReader.result;
      let image = {
        "encodedImage": this.image
      };

      // console.log(image)
      this.imageService.uploadImage(image).subscribe(

        (event: HttpEvent<any>) =>{
          switch (event.type) {
            case HttpEventType.UploadProgress:
              this.progress = Math.round(event.loaded / event.total * 100)
              // console.log(this.progress)
              break;
            case HttpEventType.Response:
              this.usuario.foto_perfil = event.body.data
              this.progress = 0
              this.usuariosService.putUsuario(this.usuario).subscribe(
                response => {
                  if(response){
                    // console.log(this.usuario)
                    this.snackBar.open('Foto actualizada','Aceptar',{duration: 1500})
                  }else{
                    this.snackBar.open('Ocurrio un error, intente nuevamente','Aceptar',{duration: 1500})
                  }
                }
              )
          }
        }


      )
    }
  }

}
