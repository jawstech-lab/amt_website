import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { MuralItem } from '../models/mural.model';

@Injectable({ providedIn: 'root' })
export class MuralService {
  private csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQb14y9KhrpMCJzQRPD5Bi9iNbIBHL3wzppXzd6sDX85p33gsSOAFteXOhWaBUrcVxiEqWpEmYB2i_4/pub?output=csv';

  constructor(private http: HttpClient) {}

  getRecados() {
    return this.http.get(this.csvUrl, { responseType: 'text' }).pipe(
      map(data => this.csvParaMural(data))
    );
  }

  private csvParaMural(csv: string): MuralItem[] {
    const linhas = this.parseCSV(csv).slice(1);
    return linhas.filter(linha => linha.length >= 3).map(linha => {
      const [dataStr, autor, recado] = linha;
      const partes = dataStr.trim().split('/');
      const dataObjeto = new Date(parseInt(partes[2]), parseInt(partes[1]) - 1, parseInt(partes[0]));

      return {
        data: dataObjeto,
        autor: autor?.trim(),
        recado: recado?.trim()
      };
    });
  }

  // Função auxiliar para interpretar quebras de linha corretamente no CSV
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