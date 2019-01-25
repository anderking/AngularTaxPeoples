import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing,appRoutingProviders } from './app.routing';//Para poder cargar las rutas
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';//Para las peticioens ajax
import { FormsModule, ReactiveFormsModule } from '@angular/forms';// para los formularios
import { environment } from '../environments/environment';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppRoutingModule } from './app-routing.module';

import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { PersonaService } from './services/persona.service';
import { EmpresaService } from './services/empresa.service';
import { PublicationService } from './services/publication.service';
import { CategoriaService } from './services/categoria.service';
import { RutaService } from './services/ruta.service';
import { LikeService } from './services/like.service';

import { TokenInterceptorService } from './services/token-interceptor.service';


import { AppComponent } from './app.component';
import { ErrorComponent } from './components/error/error.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RestringidoComponent } from './components/restringido/restringido.component';

import { LoginComponent } from './components/auth/login/login.component';
import { RegisterPadreComponent } from './components/auth/register-padre/register-padre.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { RegisterTComponent } from './components/auth/register-t/register-t.component';
import { RegisterNComponent } from './components/auth/register-n/register-n.component';
import { RegisterJComponent } from './components/auth/register-j/register-j.component';
import { LoginspinnerComponent } from './components/auth/loginspinner/loginspinner.component';
import { LogoutComponent } from './components/auth/logout/logout.component';

import { CreateComponent } from './components/publication/create/create.component';
import { DetailComponent } from './components/publication/detail/detail.component';
import { EditarComponent } from './components/publication/editar/editar.component';

import { UsersComponent } from './components/usuario/users/users.component';
import { UsersshowComponent } from './components/usuario/usersshow/usersshow.component';
import { UserspadreComponent } from './components/usuario/userspadre/userspadre.component';

import { PerfilComponent } from './components/usuario/perfil/perfil.component';
import { PerfilpadreComponent } from './components/usuario/perfilpadre/perfilpadre.component';
import { EditpersonaComponent } from './components/usuario/editpersona/editpersona.component';
import { EditempresaComponent } from './components/usuario/editempresa/editempresa.component';
import { EdituserComponent } from './components/usuario/edituser/edituser.component';

import { TimelineComponent } from './components/timeline/timeline/timeline.component';
import { TimelinepadreComponent } from './components/timeline/timelinepadre/timelinepadre.component';
import { UserseditComponent } from './components/usuario/usersedit/usersedit.component';
import { UsersdeleteComponent } from './components/usuario/usersdelete/usersdelete.component';

import { CategoriaspadreComponent } from './components/categoria/categoriaspadre/categoriaspadre.component';
import { CategoriasComponent } from './components/categoria/categorias/categorias.component';
import { CategoriascreateComponent } from './components/categoria/categoriascreate/categoriascreate.component';
import { CategoriasshowComponent } from './components/categoria/categoriasshow/categoriasshow.component';
import { CategoriaseditComponent } from './components/categoria/categoriasedit/categoriasedit.component';
import { CategoriasdeleteComponent } from './components/categoria/categoriasdelete/categoriasdelete.component';

import { RutaspadreComponent } from './components/ruta/rutaspadre/rutaspadre.component';
import { RutasComponent } from './components/ruta/rutas/rutas.component';
import { RutascreateComponent } from './components/ruta/rutascreate/rutascreate.component';
import { RutaseditComponent } from './components/ruta/rutasedit/rutasedit.component';
import { RutasshowComponent } from './components/ruta/rutasshow/rutasshow.component';
import { RutasdeleteComponent } from './components/ruta/rutasdelete/rutasdelete.component';

import { PublicationspadreComponent } from './components/publication/publicationspadre/publicationspadre.component';
import { PublicationsuserComponent } from './components/publication/publicationsuser/publicationsuser.component';
import { PublicationscreateComponent } from './components/publication/publicationscreate/publicationscreate.component';
import { PublicationsshowComponent } from './components/publication/publicationsshow/publicationsshow.component';
import { PublicationseditComponent } from './components/publication/publicationsedit/publicationsedit.component';
import { PublicationsdeleteComponent } from './components/publication/publicationsdelete/publicationsdelete.component';
import { PublicationsComponent } from './components/publication/publications/publications.component';



@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    ErrorComponent,
    DetailComponent,
    EditarComponent,
    UsersComponent,
    EdituserComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    PerfilComponent,
    UsersshowComponent,
    UserspadreComponent,
    LoginspinnerComponent,
    RestringidoComponent,
    FooterComponent,
    RegisterJComponent,
    RegisterNComponent,
    RegisterPadreComponent,
    PerfilpadreComponent,
    LogoutComponent,
    EditpersonaComponent,
    RegisterTComponent,
    EditempresaComponent,
    TimelineComponent,
    TimelinepadreComponent,
    UserseditComponent,
    UsersdeleteComponent,
    CategoriaspadreComponent,
    CategoriascreateComponent,
    CategoriasshowComponent,
    CategoriaseditComponent,
    CategoriasComponent,
    CategoriasdeleteComponent,
    RutaspadreComponent,
    RutasComponent,
    RutascreateComponent,
    RutaseditComponent,
    RutasshowComponent,
    RutasdeleteComponent,
    PublicationsuserComponent,
    PublicationspadreComponent,
    PublicationscreateComponent,
    PublicationsshowComponent,
    PublicationseditComponent,
    PublicationsdeleteComponent,
    PublicationsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    routing,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      closeButton:true
    }),
  ],
  providers:
  [
    appRoutingProviders,
    AuthService,
    UserService,
    PersonaService,
    EmpresaService,
    PublicationService,
    CategoriaService,
    RutaService,
    LikeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass : TokenInterceptorService,
      multi: true
    },
    
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }