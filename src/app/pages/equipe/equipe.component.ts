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
  statusDestaque?: { icone: string; valor: string; cor: string; titulo: string }[];
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
  cardIgnoradoHover: Membro | null = null; 

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
    private renderer: Renderer2,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.carregarDadosEquipe();

    this.intervaloFotos = setInterval(() => {
      this.indiceImg1 = (this.indiceImg1 + 2) % this.imagensHistoria.length;
      this.indiceImg2 = (this.indiceImg2 + 2) % this.imagensHistoria.length;
    }, 3500);
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
  }

  toggleCard(membro: Membro) {
    if (this.cardAtivo === membro) {
      this.fecharCardAberto();
    } else {
      this.cardAtivo = membro;
      this.renderer.addClass(this.document.body, 'no-scroll-body');
    }
  }

  fecharCard(event: Event, membro: Membro) {
    event.stopPropagation(); 
    this.fecharCardAberto();
    this.cardIgnoradoHover = membro; 
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

  getLocaisArray(locais?: string): string[] {
    if (!locais) return [];
    return locais.split(';').map(local => local.trim());
  }
}
