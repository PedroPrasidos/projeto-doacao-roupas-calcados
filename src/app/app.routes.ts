import { Routes } from '@angular/router';
import { DoacoesRoupasCalcados } from './doacoes-roupas-calcados/doacoes-roupas-calcados';
export const routes: Routes = [
{ path: 'itens', component: DoacoesRoupasCalcados },
{ path: '', redirectTo: 'itens', pathMatch: 'full' }
];