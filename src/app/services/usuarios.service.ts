import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private urlBase = environment.url + 'usuarios.php'

  constructor(
    private http: HttpClient
  ) { }

  getUsuarios():Observable<any>{
    return this.http.get(this.urlBase)
  }

  getUserByKey(key: string):Observable<any>{
    return this.http.get(this.urlBase + '?key=' + key)
  }

  postLogin(usuario: any):Observable<any>{
    const fd = new FormData()
    fd.append('username',usuario.username)
    fd.append('password',usuario.password)
    fd.append('apellido',usuario.apellido)
    fd.append('nombre',usuario.nombre)
    fd.append('email',usuario.email)
    fd.append('url_titulo',usuario.url_titulo)
    fd.append('dni',usuario.dni)
    return this.http.post(this.urlBase,fd)
  }

  putUsuario(usuario: any):Observable<any>{
    return this.http.put(this.urlBase,usuario)
  }
}
