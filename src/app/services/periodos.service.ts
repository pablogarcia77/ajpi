import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PeriodosService {

  private urlBase = environment.url + 'periodos.php'
  
  constructor(
    private http: HttpClient
  ) { }

  getPeriodos():Observable<any>{
    return this.http.get(this.urlBase)
  }
}
