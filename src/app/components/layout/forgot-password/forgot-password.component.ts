import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  public userForm: any

  public socios: Array<Usuario>

  public mailError: boolean = false

  public mail: string

  constructor(
    private formBuilder: FormBuilder,
    private usuariosService: UsuariosService
  ) {
    this.socios = new Array<Usuario>()
  }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      username: ['',[Validators.required]]
    })

    this.usuariosService.getUsuarios().subscribe(
      response => {
        this.socios = response
      }
    )
  }

  forgot(){
    let username = this.userForm.get('username').value
    if(this.existsUser(username)){
      this.sendMail(this.existsUser(username))
      this.mailError = false
    }else{
      this.mailError = true
    }
  }

  existsUser(username: string): string{
    let user = this.socios.find( (socio: Usuario) => socio.username === username)
    return (user != undefined) ? user.email : null
  }

  sendMail(username: string){
    let a = username.split("@"); 
    let b = a[0];
    let newstr = "";
    for(let i=0; i<b.length-1; i++){
      newstr += (i>2) ? '*' : b[i]
    }
    newstr += '@'+a[1]
    this.mail = newstr
  }

}
