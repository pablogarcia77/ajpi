import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { HomeComponent } from './components/layout/home/home.component';
import { SliderComponent } from './components/layout/slider/slider.component';
import { LoginComponent } from './components/layout/login/login.component';
import { MaterialModule } from './modules/material.module';
import { MatCarouselModule } from '@ngbmodule/material-carousel';
import { HttpClientModule } from '@angular/common/http';
import { RegistroComponent } from './components/layout/registro/registro.component';
import { PostsComponent } from './components/layout/posts/posts.component';
import { ProfileComponent } from './components/layout/profile/profile.component';
import { CuotaComponent } from './components/layout/cuota/cuota.component';
import { CertificadoComponent } from './components/layout/certificado/certificado.component';
import { CursosComponent } from './components/admin/cursos/cursos.component';
import { SociosComponent } from './components/admin/socios/socios.component';
import { VerTituloComponent } from './components/admin/ver-titulo/ver-titulo.component';
import { NuevoPostComponent } from './components/admin/nuevo-post/nuevo-post.component';
import { PublicacionesComponent } from './components/admin/publicaciones/publicaciones.component';
import { CuotasComponent } from './components/admin/cuotas/cuotas.component';
import { SlidesComponent } from './components/admin/slides/slides.component';
import { QuillModule } from 'ngx-quill';
import { VerPostComponent } from './components/layout/ver-post/ver-post.component';
import { NuevoCursoComponent } from './components/admin/nuevo-curso/nuevo-curso.component';
import { InscripcionComponent } from './components/admin/inscripcion/inscripcion.component';
import { CursosUsuarioComponent } from './components/layout/cursos-usuario/cursos-usuario.component'
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { NewPasswordComponent } from './components/layout/new-password/new-password.component';
import { ForgotPasswordComponent } from './components/layout/forgot-password/forgot-password.component';
import { NuevoSlideComponent } from './components/admin/nuevo-slide/nuevo-slide.component';
import ImageResize from 'quill-image-resize-module';
import { ReporteComponent } from './components/admin/reporte/reporte.component'


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SliderComponent,
    LoginComponent,
    RegistroComponent,
    PostsComponent,
    ProfileComponent,
    CuotaComponent,
    CertificadoComponent,
    CursosComponent,
    SociosComponent,
    VerTituloComponent,
    NuevoPostComponent,
    PublicacionesComponent,
    CuotasComponent,
    SlidesComponent,
    VerPostComponent,
    NuevoCursoComponent,
    InscripcionComponent,
    CursosUsuarioComponent,
    NewPasswordComponent,
    ForgotPasswordComponent,
    NuevoSlideComponent,
    ReporteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatCarouselModule.forRoot(),
    HttpClientModule,
    QuillModule.forRoot({
      // customModules: [{
      //   implementation: ImageResize,
      //   path: 'modules/imageResize'
      // }],
    }),
    NgxQRCodeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
