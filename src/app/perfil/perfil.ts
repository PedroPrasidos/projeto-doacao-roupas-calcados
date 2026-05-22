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
  historico = signal<any[]>([]);
  carregando = signal(true);

  ngOnInit() {
    this.usuarioLogado = this.service.obterUsuarioLogado();
    if (!this.usuarioLogado) { this.router.navigate(['/login']); return; }

    this.service.listarVestuariosDoUsuario(this.usuarioLogado.id_usuario).subscribe({
  next: (itens) => {
    this.meusItens.set(itens.filter(i => 
    i.status === true || 
    (i.status === false && i.id_usuario_receptor !== null)
    ));
    this.carregando.set(false);
  },
  error: () => this.carregando.set(false)
});

    this.service.obterHistorico(this.usuarioLogado.id_usuario).subscribe({
      next: (h) => this.historico.set(h),
      error: () => {}
    });
  }

  iconeCategoria(item: any): string {
    if (item.categoria === 'calcado') return '👟';
    const tipo = (item.tipo || '').toLowerCase();
    if (tipo.includes('calça') || tipo.includes('bermuda')) return '👖';
    if (tipo.includes('vestido') || tipo.includes('saia')) return '👗';
    if (tipo.includes('jaqueta') || tipo.includes('casaco')) return '🧥';
    return '👕';
  }

  badgeStatus(item: any): string {
    if (!item.status && !item.id_usuario_receptor) return 'doado';
    if (item.id_usuario_receptor) return 'reservado';
    return 'disponivel';
  }

  logout() {
    this.service.logout();
    this.router.navigate(['/login']);
  }
}