import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ServiceRoupas } from '../service-roupas';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './usuario-form.html',
  styleUrl: './usuario-form.css'
})
export class UsuarioForm {
  private service = inject(ServiceRoupas);
  private router = inject(Router);

  nome = '';
  email = '';
  senha = '';
  telefone = '';
  data_nascimento = '';
  cidade = '';
  estado = '';
  cep = '';
  logradouro = '';
  numero = '';
  bairro = '';

  erro = signal('');
  sucesso = signal('');
  carregando = signal(false);

  cadastrar() {
    if (!this.nome || !this.email || !this.senha || !this.telefone
      || !this.data_nascimento || !this.cidade || !this.estado) {
      this.erro.set('Preencha todos os campos obrigatórios.');
      return;
    }

    this.carregando.set(true);
    this.erro.set('');

    const dados = {
      nome: this.nome,
      email: this.email,
      senha: this.senha,
      telefone: this.telefone,
      data_nascimento: this.data_nascimento,
      cidade: this.cidade,
      estado: this.estado,
      cep: this.cep || null,
      logradouro: this.logradouro || null,
      numero: this.numero || null,
      bairro: this.bairro || null,
    };

    this.service.cadastrarUsuario(dados).subscribe({
      next: () => {
        this.sucesso.set('Conta criada com sucesso!');
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (err) => {
        this.erro.set(err.error?.mensagem || 'Erro ao cadastrar. Verifique os dados.');
        this.carregando.set(false);
      }
    });
  }
}