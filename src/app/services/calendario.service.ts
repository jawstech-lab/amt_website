import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Evento } from '../models/evento.model';

@Injectable({ providedIn: 'root' })
export class CalendarioService {

  private csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQawUSxRPEYJQXilwSzBQYVDJzLvcVKEtKgah6sKa8wiDsXLIeQfOuSK4XA96AE0mQ__ePQnZgReZBl/pub?output=csv';

  constructor(private http: HttpClient) {}

  getEventos() {
    return this.http.get(this.csvUrl, { responseType: 'text' }).pipe(
      map(data => this.csvParaEventos(data))
    );
  }

  private csvParaEventos(csv: string): Evento[] {
    const linhas = csv.split('\n').slice(1); 
    return linhas.map(linha => {
      const colunas = linha.split(',');
      
      const [dataStr, hora, local, titulo, descricao, tipo, imageUrl] = colunas;
  
      const partesData = dataStr.trim().split('/');
      const dia = parseInt(partesData[0], 10);
      const mes = parseInt(partesData[1], 10) - 1;
      const ano = parseInt(partesData[2], 10);
  
      const dataObjeto = new Date(ano, mes, dia);
  
      return {
        data: dataObjeto,
        hora: hora?.trim(),
        local: local?.trim(),
        titulo: titulo?.trim(),
        descricao: descricao?.trim(),
        imageUrl: imageUrl?.trim(),
        tipo: (tipo?.trim() as any) || 'Treino'
      };
    });
  }
}