import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAutenticado()) {
    return true;
  }

  const Swal = (window as any).Swal;

  if (!Swal) {
  
    const senha = window.prompt('Digite a senha:');
    return authService.checkPassword(senha ?? '') || router.createUrlTree(['/']);
  }

  const { value: senhaDigitada } = await Swal.fire({
    title: 'Área Restrita',
    text: 'Identifique-se para acessar',
    input: 'password',
    inputPlaceholder: 'Digite a senha...',
    confirmButtonText: 'Entrar',
    confirmButtonColor: '#007bff',
    showCancelButton: true,
    cancelButtonText: 'Voltar',
  
    inputAttributes: {
      autocapitalize: 'off',
      autocorrect: 'off'
    }
  });

  if (senhaDigitada && authService.checkPassword(senhaDigitada)) {
    return true;
  } else {

    if (senhaDigitada !== undefined) {
      await Swal.fire({
        icon: 'error',
        title: 'Acesso Negado',
        text: 'Senha incorreta!',
        confirmButtonColor: '#d33'
      });
    }
    return router.createUrlTree(['/']); 
  }
};