import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Slide } from '../interfaces/slide';

@Injectable({
  providedIn: 'root'
})
export class SlidesService {

  private urlBase = environment.url + 'slides.php'
  
  constructor(
    private http: HttpClient
  ) { }

  getSlides():Observable<any>{
    return this.http.get(this.urlBase)
  }

  getSlideById(id: number):Observable<any>{
    return this.http.get(this.urlBase + '?id=' + id)
  }

  postSlide(slide: Slide):Observable<any>{
    return this.http.post(this.urlBase,slide)
  }

  changeState(slide: Slide):Observable<any>{
    slide.estado = (slide.estado) ? false : true
    return this.http.put(this.urlBase,slide)
  }
}
