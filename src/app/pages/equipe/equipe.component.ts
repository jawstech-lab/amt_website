import { Component, Inject, Renderer2, OnInit, OnDestroy } from '@angular/core';
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

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) {}

  ngOnInit() {

    this.intervaloFotos = setInterval(() => {
      this.indiceImg1 = (this.indiceImg1 + 2) % this.imagensHistoria.length;
      this.indiceImg2 = (this.indiceImg2 + 2) % this.imagensHistoria.length;
    }, 3500);
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

  getLocaisArray(locais: string): string[] {
    if (!locais) return [];
    return locais.split(';').map(local => local.trim());
  }

  treinadores: Membro[] = [
    {
      nome: 'Jefferson Erbas',
      grau: 'Líder da Equipe AMT / Kru',
      descricao: `Meu nome é Jefferson Erbas, tenho 39 anos e resido em São José dos Campos, interior de São Paulo. Pratico Muay Thai há mais de 20 anos, somando 29 lutas em meu cartel ao longo desse período.<br><br>Nos últimos anos, tenho focado minha atuação como treinador, um trabalho do qual sinto muito orgulho e que tem gerado excelentes resultados, proporcionando grande visibilidade entre alunos e academias parceiras.<br><br>Atualmente, lidero a equipe AMT - Alliance MuayThai, com unidades em São José dos Campos e Caraguatatuba. Sou o fundador do CT Quinthai, em São José dos Campos, um sonho realizado há três anos.<br><br>Minha experiência internacional inclui duas temporadas na Tailândia (2015 e 2019) dedicadas a treinos e lutas. Vivenciar o Muay Thai em seu país de origem me permitiu elevar o padrão técnico do meu ensino, trazendo um conteúdo de extrema qualidade para a nossa região.`,
      imagemUrl: 'imagens/Treinadores/CT QUINTHAI.png', 
      localTreino: 'CT QUINTHAI'
    },
    {
      nome: 'Francisco Openheimer',
      grau: 'Instrutor',
      descricao: `Instrutor responsável pela unidade Maromba no DCTA.`,
      imagemUrl: 'imagens/Treinadores/Francisco Openheimer.png',
      localTreino: 'Academia Maromba (DCTA)'
    },
    {
      nome: 'Jéssica Telles',
      grau: 'Instrutora',
      descricao: `Instrutora responsável pelos treinos na Academia Giant.`,
      imagemUrl: 'imagens/Treinadores/Jéssica Telles.png',
      localTreino: 'Academia Giant Fitness'
    },
    {
      nome: 'Marlus Maciel',
      grau: 'Instrutor',
      descricao: `Instrutor responsável pela KM School.`,
      imagemUrl: 'imagens/Treinadores/Marlus M.png', 
      localTreino: 'KM SCHOOL'
    }
  ];

  lutadores: Membro[] = [];

}