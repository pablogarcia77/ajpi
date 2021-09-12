import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { CuotasService } from 'src/app/services/cuotas.service';
import { PeriodosService } from 'src/app/services/periodos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {

  public cuotaSocios: Array<any>
  public periodos: Array<any>

  @ViewChild('htmlData') htmlData: ElementRef

  constructor(
    private cuotasService: CuotasService,
    private periodosService: PeriodosService,
    private dialog: MatDialog
  ) {
    this.cuotaSocios = new Array<any>()
    this.periodos = new Array<any>()
  }

  ngOnInit(): void {

    this.periodosService.getPeriodos().subscribe(
      response => {
        // console.log(response)
        this.periodos = response
      }
    )

    this.cuotasService.getCuotasReport().subscribe(
      response => {
        // console.log(response)
        this.cuotaSocios = response
      }
    )

  }

  public generateReport(): void{
    const data = document.getElementById('htmlData')
    const doc = new jsPDF('landscape','pt','a4')
    const options = {
      background: 'white',
      scale: 3
    }

    console.log(this.htmlData.nativeElement.offsetHeight)

    html2canvas(data, options).then((canvas) => {
      canvas.height = this.htmlData.nativeElement.offsetHeight
      console.log(canvas.height +'-' + canvas.width);
      const img = canvas.toDataURL('image/PNG')

      const bufferX = 15
      const bufferY = 15

      console.log(img)
      
      const imgProps = (doc as any).getImageProperties(img)
      const pdfWidth = doc.internal.pageSize.getWidth() -2 * bufferX
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST')
      return doc

    }).then((docResult) => {
      docResult.save('Reporte.pdf')
      // this.dialog.closeAll()
    })

  }


}
