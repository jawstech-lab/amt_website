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
    const linhas = this.parseCSV(csv).slice(1); 
    
    return linhas.filter(linha => linha.length >= 1 && linha[0].trim() !== '').map(linha => {
      
      const dataStr = linha[0] || '';
      const hora = linha[1] || '';
      const local = linha[2] || '';
      const titulo = linha[3] || '';
      const descricao = linha[4] || '';
      const tipo = linha[5] || 'Treino'; 
      const imageUrl = linha[6] || '';
  
      const partesData = dataStr.trim().split('/');
      const dia = parseInt(partesData[0], 10);
      const mes = parseInt(partesData[1], 10) - 1;
      const ano = parseInt(partesData[2], 10);
  
      const dataObjeto = new Date(ano, mes, dia);
  
      return {
        data: dataObjeto,
        hora: hora.trim(),
        local: local.trim(),
        titulo: titulo.trim(),
        descricao: descricao.trim(),
        imageUrl: imageUrl.trim(),
        tipo: (tipo.trim() as any) || 'Treino' // <-- Correção do erro TS2322 aplicada aqui
      };
    });
  }

  private parseCSV(texto: string): string[][] {
    let p = '', row = [''], ret = [row], i = 0, r = 0, s = !0, l;
    for (l of texto) {
        if ('"' === l) {
            if (s && l === p) row[i] += l;
            s = !s;
        } else if (',' === l && s) l = row[++i] = '';
        else if ('\n' === l && s) {
            if ('\r' === p) row[i] = row[i].slice(0, -1);
            row = ret[++r] = [l = '']; i = 0;
        } else row[i] += l;
        p = l;
    }
    return ret;
  }
}