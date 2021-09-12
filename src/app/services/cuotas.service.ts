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
export class CuotasService {

  

  private urlBase = environment.url + 'cuotas.php'
  
  constructor(
    private http: HttpClient
  ) { }

  getCuotas():Observable<any>{
    return this.http.get(this.urlBase)
  }

  getCuotasPagadas(usuario: Usuario):Observable<any>{
    return this.http.get(this.urlBase + '?id=' + usuario.id)
  }

  getCuotasReport():Observable<any>{
    return this.http.get(this.urlBase + '?pagadas')
  }

  pagarCuotas(cuotas: any,usuario: Usuario):Observable<any>{
    let obj = {
      socio: usuario.id,
      cuotas: cuotas
    }
    const newSession = Object.assign({},obj);
    // console.log(newSession)
    return this.http.post(this.urlBase,newSession,cudOptions)
  }
}
