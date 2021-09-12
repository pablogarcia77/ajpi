import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursosComponent } from './components/admin/cursos/cursos.component';
import { InscripcionComponent } from './components/admin/inscripcion/inscripcion.component';
import { NuevoPostComponent } from './components/admin/nuevo-post/nuevo-post.component';
import { PublicacionesComponent } from './components/admin/publicaciones/publicaciones.component';
import { SlidesComponent } from './components/admin/slides/slides.component';
import { SociosComponent } from './components/admin/socios/socios.component';
import { CuotaComponent } from './components/layout/cuota/cuota.component';
import { CursosUsuarioComponent } from './components/layout/cursos-usuario/cursos-usuario.component';
import { ForgotPasswordComponent } from './components/layout/forgot-password/forgot-password.component';
import { NewPasswordComponent } from './components/layout/new-password/new-password.component';
import { PostsComponent } from './components/layout/posts/posts.component';
import { ProfileComponent } from './components/layout/profile/profile.component';
import { VerPostComponent } from './components/layout/ver-post/ver-post.component';

const routes: Routes = [
  { path: '', component: PostsComponent },
  { path: 'profile/:usuario', component: ProfileComponent},
  { path: 'cursos/:usuario', component: CursosUsuarioComponent},
  { path: 'estado/:usuario', component: CuotaComponent},
  { path: 'cursos', component: CursosComponent},
  { path: 'cursos/inscripciones/:id', component: InscripcionComponent},
  { path: 'socios', component: SociosComponent},
  { path: 'forgot-password', component: ForgotPasswordComponent},
  { path: 'recovery-password/:key', component: NewPasswordComponent},
  { path: 'publicaciones', component: PublicacionesComponent},
  { path: 'publicaciones/nueva', component: NuevoPostComponent},
  { path: 'publicaciones/editar/:id', component: NuevoPostComponent},
  { path: 'slides', component: SlidesComponent},
  { path: 'ver-publicacion/:id', component: VerPostComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
