import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryComponent } from './components/history/history.component';
import { HomeComponent } from './components/home/home.component';
import { FormularioPlatoComponent } from './components/platos/formulario-plato/formulario-plato.component';
import { RegistroRestaurautesComponent } from './components/restaurantes/registro-restaurautes/registro-restaurautes.component';
import { LoginComponent } from './components/usuarios/login/login.component';
import { RegistroUsuariosComponent } from './components/usuarios/registro-usuarios/registro-usuarios.component';

const routes: Routes = [
  { path: 'home',  component: HomeComponent},
  { path: 'usuario-registro', component: RegistroUsuariosComponent},
  { path: 'login', component: LoginComponent},
  { path: 'restaurante-registro', component:  RegistroRestaurautesComponent},
  { path: 'historia', component: HistoryComponent},
  { path: 'plato-registro', component: FormularioPlatoComponent},
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
