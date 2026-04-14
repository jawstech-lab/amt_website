import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private autorizado = false;

  // Hash para AMT2026
  private hashPermitido = 'QU1UMjAyNg=='; 

  checkPassword(senha: string): boolean {
    // btoa converte o que o usuário digitou em Base64 para comparar
    if (btoa(senha) === this.hashPermitido) {
      this.autorizado = true;
      return true;
    }
    return false;
  }

  isAutenticado(): boolean {
    return this.autorizado;
  }
}