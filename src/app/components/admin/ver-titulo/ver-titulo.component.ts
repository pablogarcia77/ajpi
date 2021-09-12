import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-ver-titulo',
  templateUrl: './ver-titulo.component.html',
  styleUrls: ['./ver-titulo.component.css']
})
export class VerTituloComponent implements OnInit {

  public socio: Usuario

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {socio: Usuario},
    private usuariosService: UsuariosService,
    private snackBar: MatSnackBar
  ) {
    this.socio = new Usuario()
    this.socio = this.data.socio
  }

  ngOnInit(): void {
  }

  lockSocio(socio: Usuario){
    // console.log(socio)
    if(socio.estado){
      socio.estado = false
    }else{
      socio.estado = true
    }
    this.usuariosService.putUsuario(socio).subscribe(
      response => {
        if(response){
          if(socio.estado){
            this.snackBar.open('Socio Desbloqueado','Aceptar',{duration:1500})
          }else{
            this.snackBar.open('Socio Bloqueado','Aceptar',{duration:1500})
          }
        }else{
          this.snackBar.open('Ocurrio un error, intente nuevamente','Aceptar',{duration:1500})
        }
      }
    )
  }

}
