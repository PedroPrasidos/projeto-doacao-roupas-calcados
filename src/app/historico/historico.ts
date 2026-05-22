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
        });
        this.carregando.set(false);
      },
      error: () => this.carregando.set(false)
    });
  }

  ehDoador(h: any): boolean {
    return h.id_usuario_doador === this.usuarioLogado?.id_usuario;
  }

  imagemCategoria(v: any): string {
    if (!v) return 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80';
    if (v.categoria === 'calcado') {
      return 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80';
    }
    return 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80';
  }
}