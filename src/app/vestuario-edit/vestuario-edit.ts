import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ServiceRoupas } from '../service-roupas';

@Component({
  selector: 'app-vestuario-edit',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './vestuario-edit.html',
  styleUrl: './vestuario-edit.css'
})
export class VestuarioEdit implements OnInit {
  private service = inject(ServiceRoupas);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  usuarioLogado = this.service.obterUsuarioLogado();
  id = 0;

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
  dadosOriginais: any = null;

  erro = signal('');
  sucesso = signal('');
  carregando = signal(true);
  salvando = signal(false);

  tamanhos_roupa_adulto = ['PP','P','M','G','GG','XG','XGG','34','36','38','40','42','44','46','48','50','52','54','56'];
  tamanhos_roupa_infantil = ['RN','P','M','G','GG','1','2','3','4','6','8','10','12','14'];
  tamanhos_calcado = ['13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46'];

  get tamanhos_roupa() {
    return this.faixa_etaria === 'infantil'
      ? this.tamanhos_roupa_infantil
      : this.tamanhos_roupa_adulto;
  }

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.service.obterVestuario(this.id).subscribe({
      next: (v) => {
        if (v.id_usuario_doador !== this.usuarioLogado?.id_usuario) {
          this.router.navigate(['/vestuario']);
          return;
        }
        this.dadosOriginais = v;
        this.categoria = v.categoria;
        this.produto = v.produto;
        this.tipo = v.tipo || '';
        this.genero = v.genero || '';
        this.cor = v.cor || '';
        this.faixa_etaria = v.faixa_etaria || '';
        this.tamanho_roupa = v.tamanho_roupa || '';
        this.tamanho_calcado = v.tamanho_calcado || '';
        this.condicao = v.condicao || '';
        this.tempo_uso = v.tempo_uso || '';
        this.descricao = v.descricao || '';
        this.carregando.set(false);
      },
      error: () => {
        this.erro.set('Item não encontrado.');
        this.carregando.set(false);
      }
    });
  }

  salvar() {
    if (!this.produto || !this.categoria || !this.faixa_etaria) {
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

    this.salvando.set(true);
    this.erro.set('');

    const dados = {
      ...this.dadosOriginais,
      categoria: this.categoria,
      produto: this.produto,
      tipo: this.tipo || null,
      genero: this.genero || null,
      cor: this.cor || null,
      faixa_etaria: this.faixa_etaria,
      tamanho_roupa: this.categoria === 'roupa' ? this.tamanho_roupa : null,
      tamanho_calcado: this.categoria === 'calcado' ? this.tamanho_calcado : null,
      condicao: this.condicao || null,
      tempo_uso: this.tempo_uso || null,
      descricao: this.descricao || null,
    };

    this.service.atualizarVestuario(this.id, dados).subscribe({
      next: () => {
        this.sucesso.set('Item atualizado com sucesso!');
        setTimeout(() => this.router.navigate(['/vestuario', this.id]), 1500);
      },
      error: (err) => {
        this.erro.set(err.error?.mensagem || 'Erro ao atualizar item.');
        this.salvando.set(false);
      }
    });
  }
}