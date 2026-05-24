import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ServiceRoupas } from '../service-roupas';

@Component({
  selector: 'app-vestuario-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './vestuario-list.html',
  styleUrl: './vestuario-list.css'
})
export class VestuarioList implements OnInit {
  private service = inject(ServiceRoupas);

  vestuarios = signal<any[]>([]);
  carregando = signal(true);
  erro = signal('');
  usuarioLogado: any = null;

  filtros = {
    categoria: '',
    genero: '',
    faixa_etaria: '',
    condicao: ''
  };

  ngOnInit() {
    this.usuarioLogado = this.service.obterUsuarioLogado();
    this.carregar();
  }

  carregar() {
    this.carregando.set(true);
    this.service.listarVestuarios(this.filtros).subscribe({
      next: (dados) => {
        this.vestuarios.set(dados.filter(v =>
          v.status === true &&
          v.id_usuario_doador !== this.usuarioLogado?.id_usuario
        ));
        this.carregando.set(false);
      },
      error: () => {
        this.erro.set('Não foi possível carregar. Verifique se o Flask está rodando.');
        this.carregando.set(false);
      }
    });
  }

  aplicarFiltro(chave: string, valor: string) {
    this.filtros = { ...this.filtros, [chave]: valor };
    this.carregar();
  }

  limparFiltros() {
    this.filtros = { categoria: '', genero: '', faixa_etaria: '', condicao: '' };
    this.carregar();
  }

  icone(item: any): string {
    return item.categoria === 'calcado' ? '👟' : '👕';
  }

  tamanho(item: any): string {
    return item.categoria === 'calcado'
      ? `Nº ${item.tamanho_calcado}`
      : `Tam. ${item.tamanho_roupa}`;
  }
}