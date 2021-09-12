import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { CuotasComponent } from '../cuotas/cuotas.component';
import { VerTituloComponent } from '../ver-titulo/ver-titulo.component';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { ReporteComponent } from '../reporte/reporte.component';

@Component({
  selector: 'app-socios',
  templateUrl: './socios.component.html',
  styleUrls: ['./socios.component.css']
})
export class SociosComponent implements OnInit {

  public dataSource: MatTableDataSource<Usuario>

  public socios: Array<Usuario>

  public displayedColumns: string[] = ['username', 'apellido','nombre','dni','fecha_registro', 'acciones'];

  @ViewChild(MatSort, {static: false}) sort!: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;
  
  constructor(
    private usuariosService: UsuariosService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource();
    this.socios = new Array<Usuario>();
  }

  ngOnInit(): void {
    this.usuariosService.getUsuarios().subscribe(
      response => {
        // console.log(response)
        this.socios = response
        this.dataSource = new MatTableDataSource(this.socios)
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator
      }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  verTitulo(socio: Usuario){
    this.dialog.open(
      VerTituloComponent,
      {
        data: {
          socio: socio
        }
      }
    )
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
  

  verCuotas(socio: Usuario){
    this.dialog.open(
      CuotasComponent,
      {
        data: {
          socio: socio
        }
      }
    )
  }

  generateReport(){
    this.dialog.open(
      ReporteComponent,
      {
        width: '100%'
      }
    )
  }
}
