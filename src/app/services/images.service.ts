import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  private urlBase = environment.url + '/imagenes.php'
  private urlTitulos = environment.url + '/titulos.php'
  
  constructor(
    public http: HttpClient
  ) { }

  uploadTitulo(image: any):Observable<any>{
    const newSession = Object.assign({},image);
    return this.http.post<any[]>(this.urlTitulos,newSession,{reportProgress: true,
    observe: 'events'});
  }

  uploadImage(image: any):Observable<any>{
    const newSession = Object.assign({},image);
    return this.http.post<any[]>(this.urlBase,newSession,{reportProgress: true,
    observe: 'events'});
  }
}
