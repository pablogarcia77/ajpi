import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Curso } from 'src/app/interfaces/curso';
import { Usuario } from 'src/app/interfaces/usuario';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-certificado',
  templateUrl: './certificado.component.html',
  styleUrls: ['./certificado.component.css']
})
export class CertificadoComponent implements OnInit {

  public curso: Curso
  public socio: Usuario
  public fecha: Date

  public title = 'app';
  public elementType = 'url';
  public value = 'https://www.ajpiweb.com/estado/';

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data:{curso: Curso,socio: Usuario}
  ) {
    this.curso = this.data.curso
    this.socio = this.data.socio
    this.fecha = new Date()
  }

  ngOnInit(): void {
    this.value += this.socio.username
  }

  public downloadPDF(): void{
    const data = document.getElementById('htmlData')
    const doc = new jsPDF('landscape','pt','a4')
    const options = {
      background: 'white',
      scale: 3
  }

  html2canvas(data, options).then((canvas) => {
      console.log(canvas.height +'-' + canvas.width);
      const img = canvas.toDataURL('image/PNG')

      const bufferX = 15
      const bufferY = 15
      
      
      const imgProps = (doc as any).getImageProperties(img)
      const pdfWidth = doc.internal.pageSize.getWidth() -2 * bufferX
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST')
      return doc
    }).then((docResult) => {
      docResult.save('Certificado.pdf')
    })
  }

}
