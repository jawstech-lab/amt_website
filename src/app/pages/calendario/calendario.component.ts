import { Component, OnInit } from '@angular/core';
import { CalendarioService } from '../../services/calendario.service';
import { Evento } from '../../models/evento.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {
  eventosFuturos: Evento[] = [];
  eventosPassados: Evento[] = [];
  mostrarPassados = false;
  
  eventoExpandido: Evento | null = null;
  imagemExpandidaUrl: string | null = null;

  constructor(private service: CalendarioService) {}

  ngOnInit() {
    this.service.getEventos().subscribe(eventos => {
      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0);

      const eventosComImagemTratada = eventos.map(evento => {
        if (evento.imageUrl) {
          evento.imageUrl = this.converterUrlDrive(evento.imageUrl);
        }
        return evento;
      });

      const ordenados = eventosComImagemTratada.sort((a, b) => a.data.getTime() - b.data.getTime());

      this.eventosFuturos = ordenados.filter(e => e.data >= hoje);
      this.eventosPassados = ordenados.filter(e => e.data < hoje).reverse(); 
    });
  }

  converterUrlDrive(url: string): string {
    if (!url) return '';

    const regexDriveFile = /drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/;
    const matchFile = url.match(regexDriveFile);
    
    if (matchFile && matchFile[1]) {
      const fileId = matchFile[1];
      return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
    }

    const regexDriveOpen = /drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/;
    const matchOpen = url.match(regexDriveOpen);
    
    if (matchOpen && matchOpen[1]) {
      const fileId = matchOpen[1];
      return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
    }

    return url;
  }

  toggleExpandir(evento: Evento) {
    if (this.eventoExpandido === evento) {
      this.eventoExpandido = null; 
    } else {
      this.eventoExpandido = evento; 
    }
  }

  abrirImagem(url: string, event: Event) {
    event.stopPropagation(); 
    this.imagemExpandidaUrl = url;
  }

  fecharImagem() {
    this.imagemExpandidaUrl = null;
  }
}