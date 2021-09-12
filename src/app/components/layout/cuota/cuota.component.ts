import { Component, Inject, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';
import { CuotasService } from 'src/app/services/cuotas.service';

@Component({
  selector: 'app-cuota',
  templateUrl: './cuota.component.html',
  styleUrls: ['./cuota.component.css']
})
export class CuotaComponent implements OnInit {

  public usuario: Usuario

  public estado: boolean = false

  private year: number

  constructor(
    private cuotasService: CuotasService
  ) {
    this.year = new Date().getFullYear()
  }

  ngOnInit(): void {
    this.usuario = JSON.parse(localStorage.getItem('usuario'))
    this.cuotasService.getCuotasPagadas(this.usuario).subscribe(
      response => {
        // console.log(response)
        let valor = response.find(element => element.periodo == this.year)
        this.estado = (valor) ? true : false
      }
    )
  }

}
