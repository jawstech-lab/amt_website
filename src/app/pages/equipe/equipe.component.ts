import { Component, Inject, Renderer2, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';

interface Membro {
  nome: string;
  apelido?: string; 
  grau: string;
  descricao: string;
  imagemUrl: string;
  localTreino?: string;
  peso?: string;
  totalLutas?: number;
  vitorias?: number;
  derrotas?: number;
  empates?: number;
}

@Component({
  selector: 'app-equipe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './equipe.component.html',
  styleUrls: ['./equipe.component.css']
})
export class EquipeComponent implements OnInit, OnDestroy {
  cardAtivo: Membro | null = null;
  cardHovered: Membro | null = null; 
  direcaoExpansao: 'left' | 'right' | 'center' = 'center'; 
  
  hoverTimeout: any; 

  imagensDestaques: string[] = [
    'imagens/destaques/destaque1.jpg',
    'imagens/destaques/destaque2.jpg',
    'imagens/destaques/destaque3.jpg'
  ];

  imagensHistoria: string[] = [
    'imagens/Nossa Historia/NossaHist1.png',
    'imagens/Nossa Historia/NossaHist2.png',
    'imagens/Nossa Historia/NossaHist3.png',
    'imagens/Nossa Historia/NossaHist4.png',
    'imagens/Nossa Historia/NossaHist5.png',
    'imagens/Nossa Historia/NossaHist6.png',
    'imagens/Nossa Historia/NossaHist7.png',
    'imagens/Nossa Historia/NossaHist8.png'
  ];
  indiceImg1: number = 0;
  indiceImg2: number = 1;
  intervaloFotos: any;
  treinadores: Membro[] = [];
  lutadores: Membro[] = [];
  carregandoEquipe = true;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.carregarDadosEquipe();
    this.preloadImages();

    this.intervaloFotos = setInterval(() => {
      this.indiceImg1 = (this.indiceImg1 + 2) % this.imagensHistoria.length;
      this.indiceImg2 = (this.indiceImg2 + 2) % this.imagensHistoria.length;
    }, 3500);
  }

  private preloadImages(): void {
    this.imagensHistoria.forEach(url => {
      const img = new Image();
      img.src = url;
    });
  }

  private carregarDadosEquipe(): void {
    forkJoin({
      treinadores: this.http.get<Membro[]>('/data/treinadores.json'),
      lutadores: this.http.get<Membro[]>('/data/lutadores.json')
    }).subscribe({
      next: ({ treinadores, lutadores }) => {
        this.treinadores = treinadores ?? [];
        this.lutadores = lutadores ?? [];
        this.carregandoEquipe = false;
      },
      error: () => {
        this.treinadores = [];
        this.lutadores = [];
        this.carregandoEquipe = false;
      }
    });
  }

  ngOnDestroy() {
    if (this.intervaloFotos) {
      clearInterval(this.intervaloFotos);
    }
    if (this.hoverTimeout) {
      clearTimeout(this.hoverTimeout);
    }
  }

  isMobile(): boolean {
    return window.innerWidth <= 768;
  }

  onCardEnter(membro: Membro, event: Event) {
    if (!this.isMobile()) {
      this.cardHovered = membro;
      this.calcularDirecaoExpansao(event.currentTarget as HTMLElement);

      this.hoverTimeout = setTimeout(() => {
        this.ativarCard(membro, event);
      }, 150);
    }
  }

  onCardLeave() {
    if (!this.isMobile()) {
      clearTimeout(this.hoverTimeout);
      this.cardAtivo = null;
      this.cardHovered = null;
      this.direcaoExpansao = 'center';
    }
  }

  onCardClick(membro: Membro, event: Event) {
    if (this.cardAtivo === membro) {
      this.fecharCardAberto(event);
    } else {
      this.cardHovered = membro;
      if (!this.isMobile()) {
        this.calcularDirecaoExpansao(event.currentTarget as HTMLElement);
      } else {
        this.direcaoExpansao = 'center'; // Mobile sempre centraliza
      }
      this.ativarCard(membro, event);
    }
  }

  private calcularDirecaoExpansao(cardElement: HTMLElement) {
    const rect = cardElement.getBoundingClientRect();
    const carouselWrapper = cardElement.closest('.carousel-wrapper');
    const wrapperRect = carouselWrapper ? carouselWrapper.getBoundingClientRect() : { left: 0, right: window.innerWidth, width: window.innerWidth };
    
    // Deixa a detecção mais inteligente dependendo do tamanho da tela
    const margemSegura = window.innerWidth <= 768 ? 150 : 300;

    if (rect.right > wrapperRect.right - margemSegura) {
      this.direcaoExpansao = 'left';
    } else if (rect.left < wrapperRect.left + margemSegura) {
      this.direcaoExpansao = 'right';
    } else {
      this.direcaoExpansao = 'center';
    }
  }

  fecharCardAberto(event?: Event) {
    if (event) event.stopPropagation();
    this.cardAtivo = null;
    this.cardHovered = null;
    this.direcaoExpansao = 'center';
  }

  private ativarCard(membro: Membro, event: Event) {
    this.cardAtivo = membro;
    
    setTimeout(() => {
      const cardElement = (event.currentTarget as HTMLElement);
      if (cardElement) {
        cardElement.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'nearest', 
          inline: 'center' 
        });
      }
    }, 50); 
  }

  rolarLista(container: HTMLElement, direcao: number) {
    const tamanhoDoPulo = container.clientWidth > 600 ? 350 : container.clientWidth * 0.8;
    container.scrollBy({ left: direcao * tamanhoDoPulo, behavior: 'smooth' });
  }

  getLocaisArray(locais?: string): string[] {
    if (!locais) return [];
    return locais.split(';').map(local => local.trim());
  }
}