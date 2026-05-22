import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ServiceRoupas } from '../service-roupas';

@Component({
  selector: 'app-vestuario-form',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './vestuario-form.html',
  styleUrl: './vestuario-form.css'
})
export class VestuarioForm {
  private service = inject(ServiceRoupas);
  private router = inject(Router);

  usuarioLogado = this.service.obterUsuarioLogado();

  categoria = '';
  produto = '';
  tipo = '';
  genero = '';
  cor = '';
  faixa_etaria = '';
  tamanho_roupa = '';
  tamanho_calcado = '';
  condicao = '';
  tempo_uso = '';
  descricao = '';

  erro = signal('');
  sucesso = signal('');
  carregando = signal(false);

  tamanhos_roupa_adulto = ['PP','P','M','G','GG','XG','XGG','34','36','38','40','42','44','46','48','50','52','54','56'];
  tamanhos_roupa_infantil = ['RN','P','M','G','GG','1','2','3','4','6','8','10','12','14'];
  tamanhos_calcado = ['13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46'];

  get tamanhos_roupa() {
    return this.faixa_etaria === 'infantil'
      ? this.tamanhos_roupa_infantil
      : this.tamanhos_roupa_adulto;
  }

  cadastrar() {
    if (!this.usuarioLogado) {
      this.router.navigate(['/login']);
      return;
    }

    if (!this.categoria || !this.produto || !this.faixa_etaria) {
      this.erro.set('Preencha todos os campos obrigatórios.');
      return;
    }

    if (this.categoria === 'roupa' && !this.tamanho_roupa) {
      this.erro.set('Informe o tamanho da roupa.');
      return;
    }

    if (this.categoria === 'calcado' && !this.tamanho_calcado) {
      this.erro.set('Informe o tamanho do calçado.');
      return;
    }

    this.carregando.set(true);
    this.erro.set('');

    const dados: any = {
      id_usuario_doador: this.usuarioLogado.id_usuario,
      cidade: this.usuarioLogado.cidade,
      estado: this.usuarioLogado.estado,
      categoria: this.categoria,
      produto: this.produto,
      faixa_etaria: this.faixa_etaria,
      genero: this.genero || null,
      tipo: this.tipo || null,
      cor: this.cor || null,
      condicao: this.condicao || null,
      tempo_uso: this.tempo_uso || null,
      descricao: this.descricao || null,
      status: true,
      data_postagem: new Date().toISOString().split('T')[0],
    };

    if (this.categoria === 'roupa') {
      dados.tamanho_roupa = this.tamanho_roupa;
    } else {
      dados.tamanho_calcado = this.tamanho_calcado;
    }

    this.service.cadastrarVestuario(dados).subscribe({
      next: () => {
        this.sucesso.set('Item cadastrado com sucesso!');
        setTimeout(() => this.router.navigate(['/vestuario']), 1500);
      },
      error: (err) => {
        this.erro.set(err.error?.mensagem || 'Erro ao cadastrar item.');
        this.carregando.set(false);
      }
    });
  }
}