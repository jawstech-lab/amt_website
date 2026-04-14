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
  cardIgnoradoHover: Membro | null = null; // Variável adicionada para bloquear o hover

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

  // Atualizado para receber o membro e aplicar o bloqueio
  fecharCard(event: Event, membro: Membro) {
    event.stopPropagation(); 
    this.fecharCardAberto();
    this.cardIgnoradoHover = membro; // Bloqueia o hover deste card temporariamente
  }

  fecharCardAberto() {
    this.cardAtivo = null;
    this.renderer.removeClass(this.document.body, 'no-scroll-body');
  }

  manterAbertoAoClicar(event: Event, membro: Membro) {
    if (this.cardAtivo === membro) {
      event.stopPropagation();
    }
  }

  // Nova função para liberar o hover quando o mouse sair do card
  resetarHover(membro: Membro) {
    if (this.cardIgnoradoHover === membro) {
      this.cardIgnoradoHover = null;
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
      descricao: ``,
      imagemUrl: 'imagens/Treinadores/Francisco Openheimer.png',
      localTreino: ''
    },
    {
      nome: 'jeferson',
      grau: 'Instrutor',
      descricao: ``,
      imagemUrl: 'imagens/Treinadores/CT QUINTHAI.png',
      localTreino: ''
    },
    {
      nome: 'Jéssica Telles',
      grau: 'Instrutor',
      descricao: ``,
      imagemUrl: 'imagens/Treinadores/Jéssica Telles.png',
      localTreino: ''
    }
  ];

  lutadores: Membro[] = [];

}