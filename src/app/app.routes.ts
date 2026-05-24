import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { UsuarioForm } from './usuario-form/usuario-form';
import { VestuarioList } from './vestuario-list/vestuario-list';
import { VestuarioForm } from './vestuario-form/vestuario-form';
import { VestuarioDetails } from './vestuario-details/vestuario-details';
import { VestuarioEdit } from './vestuario-edit/vestuario-edit';
import { PerfilComponent } from './perfil/perfil';
import { HistoricoComponent } from './historico/historico';
import { PerfilEditComponent } from './perfil-edit/perfil-edit';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'usuario/novo', component: UsuarioForm },
  { path: 'vestuario', component: VestuarioList },
  { path: 'vestuario/novo', component: VestuarioForm },
  { path: 'vestuario/:id', component: VestuarioDetails },
  { path: 'vestuario/:id/editar', component: VestuarioEdit },
  { path: 'perfil', component: PerfilComponent },
  { path: 'perfil/editar', component: PerfilEditComponent },
  { path: 'historico', component: HistoricoComponent },
];