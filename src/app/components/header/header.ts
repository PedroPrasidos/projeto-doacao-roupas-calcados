import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ServiceRoupas } from '../../service-roupas';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class HeaderComponent {
  private service = inject(ServiceRoupas);
  private router = inject(Router);
  menuAberto = false;

  get usuarioLogado() {
    return this.service.obterUsuarioLogado();
  }

  toggleMenu() { this.menuAberto = !this.menuAberto; }
  fecharMenu() { this.menuAberto = false; }

  logout() {
    this.service.logout();
    this.fecharMenu();
    this.router.navigate(['/login']);
  }
}