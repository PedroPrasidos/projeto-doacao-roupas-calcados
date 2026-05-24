import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ServiceRoupas } from '../service-roupas';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css'
})
export class PerfilComponent implements OnInit {
  private service = inject(ServiceRoupas);
  private router = inject(Router);

  usuarioLogado: any = null;
  meusItens = signal<any[]>([]);
  carregando = signal(true);

  ngOnInit() {
    this.usuarioLogado = this.service.obterUsuarioLogado();
    if (!this.usuarioLogado) { this.router.navigate(['/login']); return; }

    const id = this.usuarioLogado.id_usuario;

    // Busca vestuários e histórico juntos para cruzar
    this.service.listarVestuariosDoUsuario(id).subscribe({
      next: (itens) => {
        this.service.obterHistorico(id).subscribe({
          next: (historico) => {
            // IDs de vestuários que já foram concluídos no histórico
            const idsDoadosNoHistorico = new Set(historico.map((h: any) => h.id_vestuario));

            // Mostra apenas os que NÃO foram concluídos
            this.meusItens.set(itens.filter(i => !idsDoadosNoHistorico.has(i.id_vestuario)));
            this.carregando.set(false);
          },
          error: () => {
            // Se histórico falhar, mostra tudo que não está doado pela lógica de status
            this.meusItens.set(itens.filter(i =>
              i.status === true || i.id_usuario_receptor !== null
            ));
            this.carregando.set(false);
          }
        });
      },
      error: () => this.carregando.set(false)
    });
  }

  icone(item: any): string {
    return item.categoria === 'calcado' ? '👟' : '👕';
  }

  badgeStatus(item: any): string {
    if (item.id_usuario_receptor) return 'reservado';
    return 'disponivel';
  }

  logout() {
    this.service.logout();
    this.router.navigate(['/login']);
  }
}