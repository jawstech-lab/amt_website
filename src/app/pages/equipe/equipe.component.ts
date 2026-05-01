import { Component, ElementRef, ViewChild, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
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
  @ViewChild('equipeRail') railRef!: ElementRef<HTMLElement>;

  // Aba inicial alterada para 'treinadores'
  tabAtiva: 'lutadores' | 'treinadores' = 'treinadores';
  expandedCardIndex: number | null = null;

  treinadores: Membro[] = [];
  lutadores: Membro[] = [];
  carregandoEquipe = true;

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
  indiceImg1 = 0;
  indiceImg2 = 1;
  private intervaloFotos: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.carregarDadosEquipe();
    if (isPlatformBrowser(this.platformId)) {
      this.preloadImages();
      this.intervaloFotos = setInterval(() => {
        this.indiceImg1 = (this.indiceImg1 + 2) % this.imagensHistoria.length;
        this.indiceImg2 = (this.indiceImg2 + 2) % this.imagensHistoria.length;
      }, 3500);
    }
  }

  ngOnDestroy() {
    if (this.intervaloFotos) clearInterval(this.intervaloFotos);
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

  trocarTab(tab: 'lutadores' | 'treinadores') {
    this.tabAtiva = tab;
    this.expandedCardIndex = null;
    if (this.railRef?.nativeElement) {
      this.railRef.nativeElement.scrollLeft = 0;
    }
  }

  rolarRail(dir: number) {
    if (this.railRef?.nativeElement) {
      this.railRef.nativeElement.scrollBy({ left: dir * 360, behavior: 'smooth' });
    }
  }

  toggleCard(index: number) {
    this.expandedCardIndex = this.expandedCardIndex === index ? null : index;
  }

  padNum(n: number): string {
    return String(n).padStart(2, '0');
  }
}