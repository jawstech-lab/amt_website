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
    const linhas = csv.split('\n').slice(1);
    return linhas.map(linha => {
      const [dataStr, autor, recado] = linha.split(',');
      
      const partes = dataStr.trim().split('/');
      const dataObjeto = new Date(parseInt(partes[2]), parseInt(partes[1]) - 1, parseInt(partes[0]));

      return {
        data: dataObjeto,
        autor: autor?.trim(),
        recado: recado?.trim()
      };
    });
  }
}