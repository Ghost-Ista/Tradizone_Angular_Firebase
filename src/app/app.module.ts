import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/** ----------------------------- FORMULARIOS REACTIVOS ----------------------------- */
import { ReactiveFormsModule } from '@angular/forms';

/** ----------------------------- FIREBASE ----------------------------- */
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { environment } from 'src/environments/environment';

/** ----------------------------- COMPONENTES ----------------------------- */
import { HomeComponent } from './pages/home/home.component';
import { RegistroUsuariosComponent } from './components/usuarios/registro-usuarios/registro-usuarios.component';
import { RegistroRestaurautesComponent } from './components/restaurantes/registro-restaurautes/registro-restaurautes.component';
import { CatalogoRestaurautesComponent } from './pages/catalogo-restaurautes/catalogo-restaurautes.component';
import { LoginComponent } from './components/usuarios/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HistoryComponent } from './pages/history/history.component';
import { FormularioPlatoComponent } from './components/platos/formulario-plato/formulario-plato.component';
import { ConfiguracionCuentaComponent } from './components/usuarios/cuenta/configuracion-cuenta/configuracion-cuenta.component';
import { TableroCuentaComponent } from './components/usuarios/cuenta/tablero-cuenta/tablero-cuenta.component';
import { EventosComponent } from './pages/eventos/eventos.component';
import { FormularioEventosComponent } from './components/eventos/formulario-eventos/formulario-eventos.component';

/** -------- FORMULARIOS -------- */
import { FormsModule } from '@angular/forms'

/** -------- STORAGE: servicio de Firebase para almacenar archivos -------- */
import { AngularFireStorageModule } from '@angular/fire/storage';

/** --------- Buscador en tiempo real  ---------*/
import { FilterPipe } from './pipes/filter.pipe';
import { DatePipe } from '@angular/common';
import { FormularioHistoriasComponent } from './components/historias/formulario-historias/formulario-historias.component';
import { FormularioEditPlatoComponent } from './components/platos/formulario-edit-plato/formulario-edit-plato.component';
import { FormularioEditHistoriaComponent } from './components/historias/formulario-edit-historia/formulario-edit-historia.component';
import { FormularioEditEventoComponent } from './components/eventos/formulario-edit-evento/formulario-edit-evento.component';
import { FormEditUsuariosComponent } from './components/usuarios/form-edit-usuarios/form-edit-usuarios.component';
import { FormEditRestaurantesComponent } from './components/restaurantes/form-edit-restaurantes/form-edit-restaurantes.component';
import { FooterComponent } from './pages/footer/footer.component';
import { AboutComponent } from './pages/about/about.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegistroUsuariosComponent,
    RegistroRestaurautesComponent,
    CatalogoRestaurautesComponent,
    LoginComponent,
    NavbarComponent,
    HistoryComponent,
    FormularioPlatoComponent,
    FilterPipe,
    EventosComponent,
    FormularioEventosComponent,
    ConfiguracionCuentaComponent,
    TableroCuentaComponent,
    FormularioHistoriasComponent,
    FormularioEditPlatoComponent,
    FormularioEditHistoriaComponent,
    FormularioEditEventoComponent,
    FormEditUsuariosComponent,
    FormEditRestaurantesComponent,
    FooterComponent,
    AboutComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireStorageModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
