import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-vestuario-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './vestuario-list.html',
  styleUrl: './vestuario-list.css'
})
export class VestuarioList {
  itens = [
    { id: 1, nome: 'Camiseta Oversized Masculina - Tam. M', cidade: 'Toledo', estado: 'PR' },
    { id: 2, nome: 'Bermuda Moletom Masculina - Tam. GG', cidade: 'Cascavel', estado: 'PR' },
    { id: 3, nome: 'Camiseta Oversized Masculina - Tam. M', cidade: 'Toledo', estado: 'PR' },
    { id: 4, nome: 'Bermuda Moletom Masculina - Tam. GG', cidade: 'Cascavel', estado: 'PR' },
  ];
}