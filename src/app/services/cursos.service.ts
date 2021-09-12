import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Curso } from '../interfaces/curso';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private urlBase = environment.url + 'cursos.php'
  
  constructor(
    private http: HttpClient
  ) { }

  getCursos():Observable<any>{
    return this.http.get(this.urlBase)
  }

  getCurso(id: number):Observable<any>{
    return this.http.get(this.urlBase + '?id=' + id)
  }

  postCurso(curso: Curso):Observable<any>{
    return this.http.post(this.urlBase,curso)
  }

  putCurso(curso: Curso):Observable<any>{
    return this.http.put(this.urlBase,curso)
  }

  changeStateCurso(curso: Curso):Observable<any>{
    curso.estado = (curso.estado) ? false : true
    return this.http.put(this.urlBase,curso)
  }

  habilitarCertificado(curso: Curso):Observable<any>{
    curso.habilita_certificado = (curso.habilita_certificado) ? false : true
    return this.http.put(this.urlBase,curso)
  }
}
