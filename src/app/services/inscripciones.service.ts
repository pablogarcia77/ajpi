import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../interfaces/usuario';

const cudOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};


@Injectable({
  providedIn: 'root'
})
export class InscripcionesService {

  private urlBase = environment.url + 'inscripciones.php'
  
  constructor(
    private http: HttpClient
  ) { }

  getInscripciones():Observable<any>{
    return this.http.get(this.urlBase)
  }

  getInscripcionesCurso(curso: number):Observable<any>{
    return this.http.get(this.urlBase + '?curso=' + curso)
  }

  getInscripcionesSocio(socio: Usuario):Observable<any>{
    return this.http.get(this.urlBase + '?socio=' + socio.id)
  }
  inscribirSocio(socio: number, curso: number):Observable<any>{
    let obj = {
      socio: socio,
      curso: curso
    }
    const newSession = Object.assign({},obj);
    return this.http.post(this.urlBase,newSession,cudOptions)
  }

  removerInscripcion(socio: number, curso: number):Observable<any>{
    return this.http.delete(this.urlBase + '?curso=' + curso + '&socio=' + socio)
  }
}
