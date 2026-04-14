import { Component, Inject, Renderer2 } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';

interface Membro {
  nome: string;
  apelido?: string; 
  grau: string;
  descricao: string;
  imagemUrl: string;
  localTreino: string;
}

@Component({
  selector: 'app-equipe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './equipe.component.html',
  styleUrls: ['./equipe.component.css']
})
export class EquipeComponent {
  cardAtivo: Membro | null = null;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) {}

  toggleCard(membro: Membro) {
    if (this.cardAtivo === membro) {
      this.fecharCardAberto();
    } else {
      this.cardAtivo = membro;
      this.renderer.addClass(this.document.body, 'no-scroll-body');
    }
  }

  fecharCard(event: Event) {
    event.stopPropagation(); 
    this.fecharCardAberto();
  }

  fecharCardAberto() {
    this.cardAtivo = null;
    this.renderer.removeClass(this.document.body, 'no-scroll-body');
  }

  // Adicione esta nova função
  manterAbertoAoClicar(event: Event, membro: Membro) {

    if (this.cardAtivo === membro) {
      event.stopPropagation();
    }
  }

  rolarLista(container: HTMLElement, direcao: number) {
   const tamanhoDoPulo = container.clientWidth > 600 ? 350 : container.clientWidth * 0.8;
    
    container.scrollBy({ 
      left: direcao * tamanhoDoPulo, 
      behavior: 'smooth' 
    });
  }

  getLocaisArray(locais: string): string[] {
    if (!locais) return [];
    return locais.split(';').map(local => local.trim());
  }

  treinadores: Membro[] = [
    {
      nome: 'Francisco Openheimer',
      grau: 'Instrutor',
      descricao: `
       
      `,
      imagemUrl: 'imagens/Francisco Openheimer.png',
      // O ";" aqui separa o local da cidade na hora de exibir na tela
      localTreino: ''
    },
    {
      nome: 'jeferson',
      grau: 'Instrutor',
      descricao: `
        
      `,
      imagemUrl: 'imagens/CT QUINTHAI.png',
      localTreino: ''
    },
    {
      nome: 'Jéssica Telles',
      grau: 'Instrutor',
      descricao: `
        
      `,
      imagemUrl: 'imagens/Jéssica Telles.png',
      localTreino: ''
    }
  ];

  lutadores: Membro[] = [];
}