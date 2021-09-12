import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Publicacion } from '../interfaces/publicacion';

const cudOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root'
})
export class PublicacionesService {

  private urlBase = environment.url + 'publicaciones.php'
  
  constructor(
    private http: HttpClient
  ) { }

  getPublicaciones():Observable<any>{
    return this.http.get(this.urlBase)
  }

  getPublicacionesTrue():Observable<any>{
    return this.http.get(this.urlBase + '?post=' + true)
  }

  getPublicacion(id: number):Observable<any>{
    return this.http.get(this.urlBase + '?id=' + id)
  }

  changeState(publicacion: Publicacion):Observable<any>{
    publicacion.estado = (publicacion.estado) ? false : true
    return this.http.put(this.urlBase,publicacion)
  }

  postPublicacion(publicacion: any):Observable<any>{
    const newSession = Object.assign({},publicacion);
    return this.http.post(this.urlBase,publicacion)
  }

  putPublicacion(publicacion: any):Observable<any>{
    return this.http.put(this.urlBase,publicacion)
  }
}
