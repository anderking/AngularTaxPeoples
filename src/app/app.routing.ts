import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule, Route } from "@angular/router";

import { AuthGuard } from "./auth.guard";
import { RoleGuard } from "./role.guard";
import { RedirectAuthGuard } from "./redirect-auth.guard";

import { RestringidoComponent } from "./components/restringido/restringido.component";
import { ErrorComponent } from "./components/error/error.component";

import { LoginComponent } from "./components/auth/login/login.component";
import { RegisterPadreComponent } from "./components/auth/register-padre/register-padre.component";
import { RegisterComponent } from "./components/auth/register/register.component";
import { RegisterTComponent } from "./components/auth/register-t/register-t.component";
import { RegisterNComponent } from "./components/auth/register-n/register-n.component";
import { RegisterJComponent } from "./components/auth/register-j/register-j.component";
import { LoginspinnerComponent } from "./components/auth/loginspinner/loginspinner.component";
import { LogoutComponent } from "./components/auth/logout/logout.component";

import { UserspadreComponent } from "./components/usuario/userspadre/userspadre.component";
import { UsersComponent } from "./components/usuario/users/users.component";
import { UserscreateComponent } from "./components/usuario/userscreate/userscreate.component";
import { UsersshowComponent } from "./components/usuario/usersshow/usersshow.component";
import { UserseditComponent } from "./components/usuario/usersedit/usersedit.component";
import { UsersdeleteComponent } from "./components/usuario/usersdelete/usersdelete.component";

import { PerfilpadreComponent } from "./components/usuario/perfilpadre/perfilpadre.component";
import { PerfilComponent } from "./components/usuario/perfil/perfil.component";
import { EditpersonaComponent } from "./components/usuario/editpersona/editpersona.component";
import { EditempresaComponent } from "./components/usuario/editempresa/editempresa.component";
import { EdituserComponent } from "./components/usuario/edituser/edituser.component";

import { CategoriaspadreComponent } from "./components/categoria/categoriaspadre/categoriaspadre.component";
import { CategoriasComponent } from "./components/categoria/categorias/categorias.component";
import { CategoriascreateComponent } from "./components/categoria/categoriascreate/categoriascreate.component";
import { CategoriasshowComponent } from "./components/categoria/categoriasshow/categoriasshow.component";
import { CategoriaseditComponent } from "./components/categoria/categoriasedit/categoriasedit.component";
import { CategoriasdeleteComponent } from "./components/categoria/categoriasdelete/categoriasdelete.component";

import { RutaspadreComponent } from "./components/ruta/rutaspadre/rutaspadre.component";
import { RutasComponent } from "./components/ruta/rutas/rutas.component";
import { RutascreateComponent } from "./components/ruta/rutascreate/rutascreate.component";
import { RutaseditComponent } from "./components/ruta/rutasedit/rutasedit.component";
import { RutasshowComponent } from "./components/ruta/rutasshow/rutasshow.component";
import { RutasdeleteComponent } from "./components/ruta/rutasdelete/rutasdelete.component";

import { PublicationspadreComponent } from "./components/publication/publicationspadre/publicationspadre.component";
import { PublicationsuserComponent } from "./components/publication/publicationsuser/publicationsuser.component";
import { PublicationscreateComponent } from "./components/publication/publicationscreate/publicationscreate.component";
import { PublicationsshowComponent } from "./components/publication/publicationsshow/publicationsshow.component";
import { PublicationseditComponent } from "./components/publication/publicationsedit/publicationsedit.component";
import { PublicationsdeleteComponent } from "./components/publication/publicationsdelete/publicationsdelete.component";
import { PublicationsComponent } from "./components/publication/publications/publications.component";
import { PublicationscategoriaComponent } from "./components/publication/publicationscategoria/publicationscategoria.component";
import { PublicationsrutaComponent } from "./components/publication/publicationsruta/publicationsruta.component";

import { TimelinepadreComponent } from "./components/timeline/timelinepadre/timelinepadre.component";
import { TimelineComponent } from "./components/timeline/timeline/timeline.component";
import { PerfilfollowComponent } from "./components/follow/perfilfollow/perfilfollow.component";
import { FollowpadreComponent } from "./components/follow/followpadre/followpadre.component";

// Array de rutas
const appRoutes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "login",
    component: LoginComponent,
    canActivate: [RedirectAuthGuard],
  },
  { path: "logout", component: LogoutComponent },
  { path: "spinner", component: LoginspinnerComponent },
  {
    path: "register",
    component: RegisterComponent,
    canActivate: [RedirectAuthGuard],
  },

  {
    path: "register/:id",
    component: RegisterTComponent,
    canActivate: [AuthGuard],
  },
  { path: "registerN/:id", component: RegisterNComponent },
  { path: "registerJ/:id", component: RegisterJComponent },

  {
    path: "perfil/:id",
    component: PerfilpadreComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "", component: PerfilComponent },
      { path: "persona/edit/:id", component: EditpersonaComponent },
      { path: "empresa/edit/:id", component: EditempresaComponent },
      { path: "user/configure/:id", component: EdituserComponent },
    ],
  },

  {
    path: "users",
    component: UserspadreComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "", component: UsersComponent },
      { path: "create", component: UserscreateComponent },
      { path: "show/:id", component: UsersshowComponent },
      { path: "edit/:id", component: UserseditComponent },
      { path: "delete/:id", component: UsersdeleteComponent },
    ],
  },

  {
    path: "categorias",
    component: CategoriaspadreComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "", component: CategoriasComponent },
      { path: "create", component: CategoriascreateComponent },
      { path: "show/:id", component: CategoriasshowComponent },
      { path: "edit/:id", component: CategoriaseditComponent },
      { path: "delete/:id", component: CategoriasdeleteComponent },
    ],
  },

  {
    path: "rutas",
    component: RutaspadreComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "", component: RutasComponent },
      { path: "create", component: RutascreateComponent },
      { path: "show/:id", component: RutasshowComponent },
      { path: "edit/:id", component: RutaseditComponent },
      { path: "delete/:id", component: RutasdeleteComponent },
    ],
  },

  {
    path: "publicaciones",
    component: PublicationspadreComponent,
    canActivate: [AuthGuard],
    data: { id: localStorage.getItem("resID") },
    children: [
      { path: "", component: PublicationsComponent },
      { path: "user/:id", component: PublicationsuserComponent },
      { path: "show/:id", component: PublicationsshowComponent },
      { path: "create", component: PublicationscreateComponent },
      { path: "edit/:id", component: PublicationseditComponent },
      { path: "categoria/:id", component: PublicationscategoriaComponent },
      { path: "ruta/:id", component: PublicationsrutaComponent },
    ],
  },

  {
    path: "follow",
    component: FollowpadreComponent,
    canActivate: [AuthGuard],
    children: [
      //{path: '', component: TimelineComponent},
      { path: "perfil/:id", component: PerfilfollowComponent },
    ],
  },

  { path: "restringido", component: RestringidoComponent },
  { path: "**", component: ErrorComponent },
];

// Exportar el modulo del router
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<Route> = RouterModule.forRoot(
  appRoutes,
  { scrollPositionRestoration: "enabled" }
);
