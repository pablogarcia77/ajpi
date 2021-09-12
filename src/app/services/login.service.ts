import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private urlBase = environment.url + 'login.php'

  constructor(
    private http: HttpClient
  ) { }

  postLogin(usuario: any):Observable<any>{
    const fd = new FormData()
    fd.append('username',usuario.username)
    fd.append('password',usuario.password)
    return this.http.post(this.urlBase,fd)
  }

}
