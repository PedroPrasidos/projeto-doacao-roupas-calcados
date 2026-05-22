import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ServiceRoupas } from '../service-roupas';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  private service = inject(ServiceRoupas);
  private router = inject(Router);

  email = '';
  senha = '';
  erro = signal('');
  carregando = signal(false);

  entrar() {
    if (!this.email || !this.senha) {
      this.erro.set('Preencha e-mail e senha.');
      return;
    }
    this.carregando.set(true);
    this.erro.set('');
    this.service.listarUsuarios().subscribe({
      next: (usuarios) => {
        const encontrado = usuarios.find(
          u => u.email === this.email && u.senha === this.senha
        );
        if (encontrado) {
          this.service.salvarUsuarioLogado(encontrado);
          this.router.navigate(['/vestuario']);
        } else {
          this.erro.set('E-mail ou senha incorretos.');
        }
        this.carregando.set(false);
      },
      error: () => {
        this.erro.set('Não foi possível conectar à API. Verifique se o Flask está rodando.');
        this.carregando.set(false);
      }
    });
  }
}