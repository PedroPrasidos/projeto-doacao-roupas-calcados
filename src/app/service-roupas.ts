import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServiceRoupas {
  private http = inject(HttpClient);
  private apiUrl = 'http://127.0.0.1:5000/vestuario';

  listarRoupas(){
    return this.http.get<any[]>(this.apiUrl);
  }

  criarRoupa(roupa: any){
    return this.http.post<any>(this.apiUrl, roupa);
  }
}
