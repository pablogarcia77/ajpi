import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Periodo } from 'src/app/interfaces/periodo';
import { Usuario } from 'src/app/interfaces/usuario';
import { CuotasService } from 'src/app/services/cuotas.service';
import { PeriodosService } from 'src/app/services/periodos.service';

@Component({
  selector: 'app-cuotas',
  templateUrl: './cuotas.component.html',
  styleUrls: ['./cuotas.component.css']
})
export class CuotasComponent implements OnInit {

  public socio: Usuario

  public periodos: Array<Periodo>

  public cuotasPagadas: Array<any>

  public muestraPago: boolean=false;

  public muestraDeuda: boolean=false;

  public deuda: number = 0;

  public selectedList: any;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {socio: Usuario},
    private cuotasService: CuotasService,
    private periodosService: PeriodosService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.socio = new Usuario()
    this.socio = this.data.socio
    this.periodos = new Array<Periodo>()
    this.cuotasPagadas = new Array<any>()
  }

  ngOnInit(): void {
    this.cargarCuotasPagadas()
    this.periodosService.getPeriodos().subscribe(
      response => {
        this.periodos = response
      }
    )
  }

  nuevoPago(){
    this.muestraPago=true
  }

  nuevaDeuda(){
    this.muestraDeuda=true
    this.selectedList = null
  }

  cargarCuotasPagadas(){
    this.cuotasService.getCuotasPagadas(this.socio).subscribe(
      response => {
        // console.log(response)
        this.cuotasPagadas = response
      }
    )
  }
  pagar(){
    this.muestraPago=false
    // console.log(this.selectedList)
    this.cuotasService.pagarCuotas(this.selectedList,this.socio,0).subscribe(
      response => {
        // console.log(response)
        if(response){
          this.snackBar.open('Cuota agregada correctamente','Aceptar',{duration:1500})
        }
        this.cargarCuotasPagadas()
      }
    )
  }

  cargarDeuda(){
    this.muestraDeuda=false
    this.cuotasService.pagarCuotas(this.selectedList,this.socio,this.deuda).subscribe(
      response => {
        // console.log(response)
        if(response){
          this.snackBar.open('Deuda agregada correctamente','Aceptar',{duration:1500})
        }
        this.cargarCuotasPagadas()
      }
    )
    this.selectedList = null
  }

  deletePago(id: number){
    this.cuotasService.deleteCuotasPagadas(id).subscribe(
      () => {
        this.snackBar.open('Pago eliminado','Aceptar',{duration: 1500})
        this.dialog.closeAll()
      }
    )
  }

}
