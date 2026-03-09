import { Component, OnInit } from '@angular/core';
import { CalendarioService } from '../../services/calendario.service';
import { Evento } from '../../models/evento.model';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-calendario',
  imports: [CommonModule],
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {
  eventosFuturos: Evento[] = [];
  eventosPassados: Evento[] = [];
  mostrarPassados = false;

  constructor(private service: CalendarioService) {}

  ngOnInit() {
    this.service.getEventos().subscribe(eventos => {
      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0);

      // Ordenação cronológica
      const ordenados = eventos.sort((a, b) => a.data.getTime() - b.data.getTime());

      this.eventosFuturos = ordenados.filter(e => e.data >= hoje);
      this.eventosPassados = ordenados.filter(e => e.data < hoje).reverse(); // Mais recentes primeiro
    });
  }
}