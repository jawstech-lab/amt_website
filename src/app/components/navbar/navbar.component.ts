import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  menuAberto: boolean = false;
  scrolled: boolean = false;

  @HostListener('window:scroll', [])
  onScroll() {
    this.scrolled = window.scrollY > 80;
  }

  constructor(private router: Router, private location: Location) {}

  alternarMenu() {
    this.menuAberto = !this.menuAberto;
  }

  fecharMenu() {
    this.menuAberto = false;
  }

  navegarParaSecao(secaoId: string) {
    this.fecharMenu();
    
    // Se estamos em uma rota diferente da home, volta para home primeiro
    if (this.router.url !== '/' && !this.router.url.startsWith('/#')) {
      this.router.navigate(['/']).then(() => {
        this.scrollParaSecao(secaoId);
      });
    } else {
      // Se já estamos na home, vai direto para a seção
      this.scrollParaSecao(secaoId);
    }
  }

  private scrollParaSecao(secaoId: string) {
    // Atualiza o URL com o hash
    this.location.go(`/#${secaoId}`);
    
    // Aguarda um pouco para garantir que o DOM foi renderizado
    setTimeout(() => {
      const elemento = document.getElementById(secaoId);
      if (elemento) {
        elemento.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }
}