import { Component, ElementRef, ViewChild, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  // Usamos HTMLVideoElement para o IntelliSense
  @ViewChild('bgVideo') videoRef!: ElementRef<HTMLVideoElement>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    // Verificamos se estamos no Navegador para evitar erros de SSR
    if (isPlatformBrowser(this.platformId)) {
      this.iniciarVideo();
    }
  }

  private iniciarVideo() {
    // Verificação de segurança: o elemento existe?
    if (this.videoRef && this.videoRef.nativeElement) {
      const video = this.videoRef.nativeElement;

      // Garante que o elemento seja tratado como vídeo antes de chamar o play
      if (typeof video.play === 'function') {
        video.currentTime = 1;
        
        video.play().catch(err => {
          console.warn("Autoplay bloqueado pelo browser. O usuário precisa interagir com a página primeiro.", err);
        });

        // Pausa o vídeo quando terminar (se não estiver em loop)
        video.onended = () => video.pause();
      } else {
        console.error("O elemento #bgVideo não é um elemento de vídeo válido.");
      }
    }
  }
}