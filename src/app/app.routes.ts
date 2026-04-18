import { Routes } from '@angular/router';
import { VestuarioList } from './vestuario-list/vestuario-list';
import { VestuarioForm } from './vestuario-form/vestuario-form';
import { VestuarioDetails } from './vestuario-details/vestuario-details';
import { UsuarioForm } from './usuario-form/usuario-form';

export const routes: Routes = [
  { path: '', redirectTo: 'vestuario', pathMatch: 'full' },
  { path: 'vestuario', component: VestuarioList },
  { path: 'vestuario/novo', component: VestuarioForm },
  { path: 'vestuario/:id', component: VestuarioDetails },
  { path: 'usuario/novo', component: UsuarioForm },
];