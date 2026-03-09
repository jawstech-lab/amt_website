import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// 1. Importe estas classes do roteador
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  // 2. Adicione-as aqui no array de imports
  imports: [CommonModule, RouterLink, RouterLinkActive], 
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  // Nenhuma lógica extra no TS é necessária para o link funcionar
}