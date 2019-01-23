import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing,appRoutingProviders } from './app.routing';//Para poder cargar las rutas
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';//Para las peticioens ajax
import { FormsModule, ReactiveFormsModule } from '@angular/forms';// para los formularios
import { environment } from '../environments/environment';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { TokenInterceptorService } from './services/token-interceptor.service';

import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AppRoutingModule } from './app-routing.module';
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

import { CreateComponent } from './components/publication/create/create.component';
import { ProjectsComponent } from './components/publication/projects/projects.component';
import { DetailComponent } from './components/publication/detail/detail.component';
import { EditarComponent } from './components/publication/editar/editar.component';
import { ProjectspadreComponent } from './components/publication/projectspadre/projectspadre.component';
import { ProjectsusersComponent } from './components/publication/projectsusers/projectsusers.component';

import { UsersComponent } from './components/usuario/users/users.component';

import { EdituserComponent } from './components/usuario/edituser/edituser.component';
import { PerfilComponent } from './components/usuario/perfil/perfil.component';
import { UsersshowComponent } from './components/usuario/usersshow/usersshow.component';
import { UserspadreComponent } from './components/usuario/userspadre/userspadre.component';
import { PerfilpadreComponent } from './components/usuario/perfilpadre/perfilpadre.component';
import { LogoutComponent } from './components/auth/logout/logout.component';
import { EditpersonaComponent } from './components/usuario/editpersona/editpersona.component';
import { EditempresaComponent } from './components/usuario/editempresa/editempresa.component';



@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    ProjectsComponent,
    ErrorComponent,
    DetailComponent,
    EditarComponent,
    UsersComponent,
    EdituserComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    ProjectsusersComponent,
    PerfilComponent,
    UsersshowComponent,
    ProjectspadreComponent,
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
    {
      provide: HTTP_INTERCEPTORS,
      useClass : TokenInterceptorService,
      multi: true
    },
    
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }