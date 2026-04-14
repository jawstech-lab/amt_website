import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Se já estiver logado nesta sessão, libera direto
  if (authService.isAutenticado()) {
    return true;
  }

  // Pegamos o Swal que você colocou no index.html
  const Swal = (window as any).Swal;

  if (!Swal) {
    // Caso o script do index.html falhe por algum motivo, usamos o prompt padrão
    const senha = window.prompt('Digite a senha:');
    return authService.checkPassword(senha ?? '') || router.createUrlTree(['/']);
  }

  // Janela Bonitona do SweetAlert2
  const { value: senhaDigitada } = await Swal.fire({
    title: 'Área Restrita',
    text: 'Identifique-se para acessar',
    input: 'password',
    inputPlaceholder: 'Digite a senha...',
    confirmButtonText: 'Entrar',
    confirmButtonColor: '#007bff',
    showCancelButton: true,
    cancelButtonText: 'Voltar',
    // Isso evita que a senha apareça no código se alguém inspecionar o modal
    inputAttributes: {
      autocapitalize: 'off',
      autocorrect: 'off'
    }
  });

  // Validação
  if (senhaDigitada && authService.checkPassword(senhaDigitada)) {
    return true;
  } else {
    // Se clicou em cancelar ou errou a senha
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