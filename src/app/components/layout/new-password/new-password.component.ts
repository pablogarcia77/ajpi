import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {

  public user: Usuario

  public userForm: any

  public success: boolean = false

  constructor(
    private activatedRouter: ActivatedRoute,
    private usuariosService: UsuariosService,
    private formBuilder: FormBuilder
  ) {
    this.user = new Usuario()
  }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(
      response => {
        this.usuariosService.getUserByKey(response.key).subscribe(
          response => {
            this.user.id = response.id
            // console.log(this.user)
          }
        )
      }
    )

    this.userForm = this.formBuilder.group({
      password: ['',[Validators.required]]
    })
  }


  resetPassword(){
    this.user.password = this.userForm.get('password').value
    this.usuariosService.putUsuario(this.user).subscribe(
      response => {
        if(response){
          this.success = true
        }
      }
    )
  }

}
