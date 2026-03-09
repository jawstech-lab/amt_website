import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface LocalTreino {
  nome: string;
  endereco: string;
  horarios: string;
  imagemUrl: string;
  linkDireto: string; 
}

@Component({
  selector: 'app-local-treino',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './local-treino.component.html',
  styleUrls: ['./local-treino.component.css']
})
export class LocalTreinoComponent {
  
  locais: LocalTreino[] = [
    {
      nome: 'Matriz (Centro)',
      endereco: 'Rua das Flores, 123 - Centro, São José dos Campos - SP',
      horarios: 'Seg a Sex: 07h às 22h | Sáb: 08h às 12h',
      imagemUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
       // aqui cola literalmente o que copiar no "compartilhar" "enviar um link"
      linkDireto: 'https://maps.app.goo.gl/SpV7A9Cm18FGtfa68'
    },
    {
      nome: 'Filial Zona Sul',
      endereco: 'Av. dos Esportes, 987 - Jd. Sul, São José dos Campos - SP',
      horarios: 'Seg a Sex: 18h às 22h',
      imagemUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      linkDireto: 'https://maps.app.goo.gl/SpV7A9Cm18FGtfa68'
    }
  ];
}