import { Component, Inject, Renderer2 } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';

interface Membro {
  nome: string;
  apelido: string;
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

  rolarLista(container: HTMLElement, direcao: number) {
    container.scrollBy({ left: direcao * 300, behavior: 'smooth' });
  }

  getLocaisArray(locais: string): string[] {
    if (!locais) return [];
    return locais.split(';').map(local => local.trim());
  }

  // Lista de Treinadores
  treinadores: Membro[] = [
    {
      nome: 'Kru Jefferson Erbas',
      apelido: '"Head"',
      grau: 'grau',
      descricao: 'descricao',
      imagemUrl: 'https://i.pinimg.com/736x/8f/d7/3c/8fd73cbf5fdc318d696e57e8fff1ec98.jpg' ,
      localTreino:''
    },
    {
      nome: 'Kru Marlus Maciel',
      apelido: '""',
      grau: 'grau',
      descricao: 'descricao',
      imagemUrl: 'https://i.pinimg.com/736x/8f/d7/3c/8fd73cbf5fdc318d696e57e8fff1ec98.jpg',
      localTreino:''
    }
  ];

  // Lista de Lutadores
  lutadores: Membro[] = [
    {
      nome: 'Roberto Santos',
      apelido: '" apelido"',
      grau: 'grau',
      descricao: 'descricao',
      imagemUrl: 'https://i.pinimg.com/736x/8f/d7/3c/8fd73cbf5fdc318d696e57e8fff1ec98.jpg',
      localTreino:''
    },
    {
      nome: 'Juliana Costa',
      apelido: '" apelido"',
      grau: 'grau',
      descricao: 'descricaodescricaodescricaodescricaodescricaodescricaodescricaodescricaodescricaodescricaodescricaodescricaodescricaodescricaodescricaodescricaodescricaodescricaodescricaodescricaodescricaodescricaodescricaoescricaodescricaodescricaodescricaodescricaodescricaodescricaodescricaodescricaodescricaodescricaodescricaodescricaodescricaodescricaodescricaodescricaodescricaodescricaodescricaoescricaodescricaodescricaodescricaodescricaodescricaodescricaodescricaodescricaodescricaodescricaodescricaodescricaodescricaodescricaodescricaodescricaodescricaodescricaodescricaoescricaodescricaodescricaodescricaodescricaodescricaodescricaodescricaodescricaodescricaodescricaodescricaodescricaodescricaodescricaodescricaodescricaodescricaodescricaodescricaoescricaodescricaodescricaodescricaodescricaodescricaodescricaodescricaodescricaodescricaodescricaodescricaodescricaodescricaodescricaodescricaodescricaodescricaodescricaodescricaoescricaodescricaodescricaodescricaodescricaodescricaodescricaodescricaodescricaodescricaodescricaodescricaodescricaodescricaodescricaodescricaodescricaodescricaodescricaodescricao',
      imagemUrl: 'https://i.pinimg.com/736x/8f/d7/3c/8fd73cbf5fdc318d696e57e8fff1ec98.jpg',
      localTreino:'treino 1 treino 2; treino 3'
    },
    {
      nome: 'Roberto Santos',
      apelido: '" apelido"',
      grau: 'grau',
      descricao: 'descricao',
      imagemUrl: 'https://i.pinimg.com/736x/8f/d7/3c/8fd73cbf5fdc318d696e57e8fff1ec98.jpg',
      localTreino:''
    },
    {
      nome: 'Juliana Costa',
      apelido: '" apelido"',
      grau: 'grau',
      descricao: 'descricao',
      imagemUrl: 'https://i.pinimg.com/736x/8f/d7/3c/8fd73cbf5fdc318d696e57e8fff1ec98.jpg',
      localTreino:''
    },
    {
      nome: 'Roberto Santos',
      apelido: '" apelido"',
      grau: 'grau',
      descricao: 'descricao',
      imagemUrl: 'https://i.pinimg.com/736x/8f/d7/3c/8fd73cbf5fdc318d696e57e8fff1ec98.jpg',
      localTreino:''
    },
    {
      nome: 'Juliana Costa',
      apelido: '" apelido"',
      grau: 'grau',
      descricao: 'descricao',
      imagemUrl: 'https://i.pinimg.com/736x/8f/d7/3c/8fd73cbf5fdc318d696e57e8fff1ec98.jpg',
      localTreino:''
    },
    {
      nome: 'Roberto Santos',
      apelido: '" apelido"',
      grau: 'grau',
      descricao: 'descricao',
      imagemUrl: 'https://i.pinimg.com/736x/8f/d7/3c/8fd73cbf5fdc318d696e57e8fff1ec98.jpg',
      localTreino:''
    },
    {
      nome: 'Juliana Costa',
      apelido: '" apelido"',
      grau: 'grau',
      descricao: 'descricao',
      imagemUrl: 'https://i.pinimg.com/736x/8f/d7/3c/8fd73cbf5fdc318d696e57e8fff1ec98.jpg',
      localTreino:''
    },
    {
      nome: 'Roberto Santos',
      apelido: '" apelido"',
      grau: 'grau',
      descricao: 'descricao',
      imagemUrl: 'https://i.pinimg.com/736x/8f/d7/3c/8fd73cbf5fdc318d696e57e8fff1ec98.jpg',
      localTreino:''
    },
    {
      nome: 'Juliana Costa',
      apelido: '" apelido"',
      grau: 'grau',
      descricao: 'descricao',
      imagemUrl: 'https://i.pinimg.com/736x/8f/d7/3c/8fd73cbf5fdc318d696e57e8fff1ec98.jpg',
      localTreino:''
    },
    {
      nome: 'Roberto Santos',
      apelido: '" apelido"',
      grau: 'grau',
      descricao: 'descricao',
      imagemUrl: 'https://i.pinimg.com/736x/8f/d7/3c/8fd73cbf5fdc318d696e57e8fff1ec98.jpg',
      localTreino:''
    },
    {
      nome: 'Juliana Costa',
      apelido: '" apelido"',
      grau: 'grau',
      descricao: 'descricao',
      imagemUrl: ' ',
      localTreino:''
    },
    {
      nome: 'Marcos Paulo',
      apelido: '" apelido"',
      grau: 'grau',
      descricao: 'descricao',
      imagemUrl: '',
      localTreino:''
    }
  ];
}