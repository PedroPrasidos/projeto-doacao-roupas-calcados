import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ServiceRoupas } from '../service-roupas';

@Component({
  selector: 'app-vestuario-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './vestuario-details.html',
  styleUrl: './vestuario-details.css'
})
export class VestuarioDetails implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private service = inject(ServiceRoupas);

  vestuario = signal<any>(null);
  receptor = signal<any>(null);
  doador = signal<any>(null);
  carregando = signal(true);
  mensagem = signal('');
  erro = signal('');

  usuarioLogado = this.service.obterUsuarioLogado();

  get ehDoador(): boolean {
    return this.usuarioLogado?.id_usuario === this.vestuario()?.id_usuario_doador;
  }

  get temInteresse(): boolean {
    return !!this.vestuario()?.id_usuario_receptor;
  }

  get foiDoado(): boolean {
    return this.vestuario()?.status === false && !this.vestuario()?.id_usuario_receptor;
  }

  get tamanho(): string {
    const v = this.vestuario();
    if (!v) return '';
    return v.categoria === 'calcado' ? `Nº ${v.tamanho_calcado}` : `Tam. ${v.tamanho_roupa}`;
  }

  get icone(): string {
    const v = this.vestuario();
    if (!v) return '👕';
    if (v.categoria === 'calcado') return '👟';
    const tipo = (v.tipo || '').toLowerCase();
    if (tipo.includes('calça') || tipo.includes('bermuda')) return '👖';
    if (tipo.includes('vestido') || tipo.includes('saia')) return '👗';
    if (tipo.includes('jaqueta') || tipo.includes('casaco')) return '🧥';
    return '👕';
  }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.service.obterVestuario(id).subscribe({
      next: (v) => {
        this.vestuario.set(v);
        if (v.id_usuario_doador) {
          this.service.obterUsuario(v.id_usuario_doador).subscribe({
            next: (u) => this.doador.set(u)
          });
        }
        if (v.id_usuario_receptor) {
          this.service.obterUsuario(v.id_usuario_receptor).subscribe({
            next: (u) => this.receptor.set(u)
          });
        }
        this.carregando.set(false);
      },
      error: () => {
        this.erro.set('Item não encontrado.');
        this.carregando.set(false);
      }
    });
  }

  registrarInteresse() {
    if (!this.usuarioLogado) { this.router.navigate(['/login']); return; }
    const v = this.vestuario();
    const dados = { ...v, id_usuario_receptor: this.usuarioLogado.id_usuario, status: false };
    this.service.atualizarVestuario(v.id_vestuario, dados).subscribe({
      next: () => {
        this.mensagem.set('Interesse registrado! Aguarde o contato do doador.');
        this.vestuario.set({ ...v, id_usuario_receptor: this.usuarioLogado.id_usuario, status: false });
        this.receptor.set(this.usuarioLogado);
      },
      error: () => this.erro.set('Erro ao registrar interesse.')
    });
  }

  recusar() {
    const v = this.vestuario();
    const dados = { ...v, id_usuario_receptor: null, status: true };
    this.service.atualizarVestuario(v.id_vestuario, dados).subscribe({
      next: () => {
        this.mensagem.set('Interesse recusado. O item voltou para a listagem.');
        this.vestuario.set({ ...v, id_usuario_receptor: null, status: true });
        this.receptor.set(null);
      },
      error: () => this.erro.set('Erro ao recusar interesse.')
    });
  }

  confirmarDoacao() {
  const v = this.vestuario();
  const dados = {
    id_vestuario: v.id_vestuario,
    id_usuario_doador: v.id_usuario_doador,
    id_usuario_receptor: v.id_usuario_receptor,
    status_doacao: true,
    data_conclusao: new Date().toISOString().split('T')[0]
  };
  this.service.concluirDoacao(v.id_vestuario, dados).subscribe({
    next: () => {
      this.mensagem.set('Doação confirmada com sucesso!');
      setTimeout(() => this.router.navigate(['/vestuario']), 2000);
    },
    error: () => this.erro.set('Erro ao confirmar doação.')
  });
}

  excluir() {
  if (!confirm('Tem certeza que deseja excluir este item?')) return;
  this.service.deletarVestuario(this.vestuario().id_vestuario).subscribe({
    next: () => this.router.navigate(['/vestuario']),
    error: () => this.erro.set('Erro ao excluir item.')
  });
}
}