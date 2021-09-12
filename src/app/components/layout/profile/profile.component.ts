import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public userForm: any;
  public usuario: Usuario;

  constructor(
    private formBuilder: FormBuilder,
    private usuariosService: UsuariosService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.usuario = new Usuario();
  }

  ngOnInit(): void {

    this.usuario = JSON.parse(localStorage.getItem('usuario'))

    this.userForm = this.formBuilder.group({
      username: [this.usuario.username],
      password: [''],
      apellido: [this.usuario.apellido],
      nombre: [this.usuario.nombre],
      dni: [this.usuario.dni],
      email: [this.usuario.email, [Validators.email]],
      foto_perfil: [this.usuario.foto_perfil],
    })
  }

  update(){
    this.usuario.apellido = this.userForm.get('apellido').value
    this.usuario.nombre = this.userForm.get('nombre').value
    this.usuario.dni = this.userForm.get('dni').value
    this.usuario.email = this.userForm.get('email').value
    this.usuario.foto_perfil = this.userForm.get('foto_perfil').value
    if(this.userForm.get('password').value){
      this.usuario.password = this.userForm.get('password').value
    }
    this.usuariosService.putUsuario(this.usuario).subscribe(
      response => {
        // console.log(response)
        if(response){
          this.snackBar.open('Datos guardados correctamente','Aceptar',{duration: 1500})
          localStorage.setItem('usuario',JSON.stringify(this.usuario))
          this.router.navigate([''])
        }else{
          this.snackBar.open('Ocurrio un error, intente nuevamente','Aceptar',{duration: 1500})
        }
      }
    )
  }

}
