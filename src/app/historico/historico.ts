import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ServiceRoupas } from '../service-roupas';

@Component({
  selector: 'app-historico',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './historico.html',
  styleUrl: './historico.css'
})
export class HistoricoComponent implements OnInit {
  private service = inject(ServiceRoupas);
  private router = inject(Router);

  usuarioLogado: any = null;
  historico = signal<any[]>([]);
  vestuarios = signal<Map<number, any>>(new Map());
  usuarios = signal<Map<number, any>>(new Map());
  carregando = signal(true);

  ngOnInit() {
    this.usuarioLogado = this.service.obterUsuarioLogado();
    if (!this.usuarioLogado) { this.router.navigate(['/login']); return; }

    this.service.obterHistorico(this.usuarioLogado.id_usuario).subscribe({
      next: (registros) => {
        this.historico.set(registros);
        registros.forEach(h => {
          this.service.obterVestuario(h.id_vestuario).subscribe({
            next: (v) => {
              const mapa = new Map(this.vestuarios());
              mapa.set(h.id_vestuario, v);
              this.vestuarios.set(mapa);
            },
            error: () => {}
          });
          if (h.id_usuario_doador !== this.usuarioLogado.id_usuario) {
            this.service.obterUsuario(h.id_usuario_doador).subscribe({
              next: (u) => {
                const mapa = new Map(this.usuarios());
                mapa.set(h.id_usuario_doador, u);
                this.usuarios.set(mapa);
              },
              error: () => {}
            });
          }
          if (h.id_usuario_receptor !== this.usuarioLogado.id_usuario) {
            this.service.obterUsuario(h.id_usuario_receptor).subscribe({
              next: (u) => {
                const mapa = new Map(this.usuarios());
                mapa.set(h.id_usuario_receptor, u);
                this.usuarios.set(mapa);
              },
              error: () => {}
            });
          }
        });
        this.carregando.set(false);
      },
      error: () => this.carregando.set(false)
    });
  }

  ehDoador(h: any): boolean {
    return h.id_usuario_doador === this.usuarioLogado?.id_usuario;
  }

  icone(v: any): string {
    if (!v) return '👕';
    return v.categoria === 'calcado' ? '👟' : '👕';
  }

  nomeDoador(h: any): string {
    return this.usuarios().get(h.id_usuario_doador)?.nome || '...';
  }

  nomeReceptor(h: any): string {
    return this.usuarios().get(h.id_usuario_receptor)?.nome || '...';
  }

  formatarData(data: string): string {
    if (!data) return '';
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
  }
}