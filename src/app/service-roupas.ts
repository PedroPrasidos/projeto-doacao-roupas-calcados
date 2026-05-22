import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ServiceRoupas {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5000';

  listarVestuarios(filtros: any = {}) {
    let params = new HttpParams();
    Object.keys(filtros).forEach(key => {
      if (filtros[key]) params = params.set(key, filtros[key]);
    });
    return this.http.get<any[]>(`${this.apiUrl}/vestuario`, { params });
  }

  obterVestuario(id: number) {
    return this.http.get<any>(`${this.apiUrl}/vestuario/${id}`);
  }

  cadastrarVestuario(dados: any) {
    return this.http.post<any>(`${this.apiUrl}/vestuario`, dados);
  }

  atualizarVestuario(id: number, dados: any) {
    return this.http.put<any>(`${this.apiUrl}/vestuario/${id}`, dados);
  }

  deletarVestuario(id: number) {
    return this.http.delete<any>(`${this.apiUrl}/vestuario/${id}`);
  }

  concluirDoacao(id: number, dados: any) {
    return this.http.post<any>(`${this.apiUrl}/vestuario/${id}/concluir`, dados);
  }

  listarUsuarios() {
    return this.http.get<any[]>(`${this.apiUrl}/usuarios`);
  }

  cadastrarUsuario(dados: any) {
    return this.http.post<any>(`${this.apiUrl}/usuarios`, dados);
  }

  obterUsuario(id: number) {
    return this.http.get<any>(`${this.apiUrl}/usuarios/${id}`);
  }

  atualizarUsuario(id: number, dados: any) {
    return this.http.put<any>(`${this.apiUrl}/usuarios/${id}`, dados);
  }

  listarVestuariosDoUsuario(id: number) {
    return this.http.get<any[]>(`${this.apiUrl}/usuarios/${id}/vestuario`);
  }

  obterHistorico(id: number) {
    return this.http.get<any[]>(`${this.apiUrl}/usuarios/${id}/historico`);
  }

  salvarUsuarioLogado(usuario: any) {
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  obterUsuarioLogado() {
    const dados = localStorage.getItem('usuario');
    return dados ? JSON.parse(dados) : null;
  }

  logout() {
    localStorage.removeItem('usuario');
  }
}