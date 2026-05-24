import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ServiceRoupas } from '../service-roupas';

@Component({
  selector: 'app-perfil-edit',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './perfil-edit.html',
  styleUrl: './perfil-edit.css'
})
export class PerfilEditComponent implements OnInit {
  private service = inject(ServiceRoupas);
  private router = inject(Router);

  usuarioLogado: any = null;

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

  ngOnInit() {
    this.usuarioLogado = this.service.obterUsuarioLogado();
    if (!this.usuarioLogado) { this.router.navigate(['/login']); return; }

    this.nome = this.usuarioLogado.nome || '';
    this.email = this.usuarioLogado.email || '';
    this.senha = this.usuarioLogado.senha || '';
    this.telefone = this.usuarioLogado.telefone || '';
    this.data_nascimento = this.usuarioLogado.data_nascimento || '';
    this.cidade = this.usuarioLogado.cidade || '';
    this.estado = this.usuarioLogado.estado || '';
    this.cep = this.usuarioLogado.cep || '';
    this.logradouro = this.usuarioLogado.logradouro || '';
    this.numero = this.usuarioLogado.numero || '';
    this.bairro = this.usuarioLogado.bairro || '';
  }

  salvar() {
    if (!this.nome || !this.email || !this.senha || !this.telefone
      || !this.data_nascimento || !this.cidade || !this.estado) {
      this.erro.set('Preencha todos os campos obrigatórios.');
      return;
    }

    if (!this.email.includes('@')) {
      this.erro.set('E-mail deve conter @.');
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

    this.service.atualizarUsuario(this.usuarioLogado.id_usuario, dados).subscribe({
      next: () => {
        const atualizado = { ...this.usuarioLogado, ...dados };
        this.service.salvarUsuarioLogado(atualizado);
        this.sucesso.set('Perfil atualizado com sucesso!');
        setTimeout(() => this.router.navigate(['/perfil']), 1500);
      },
      error: (err) => {
        this.erro.set(err.error?.mensagem || 'Erro ao atualizar perfil.');
        this.carregando.set(false);
      }
    });
  }
}