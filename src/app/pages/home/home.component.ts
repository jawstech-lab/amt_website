import { Component, ElementRef, ViewChild, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  // Usamos HTMLVideoElement explicitamente para ajudar o IntelliSense
  @ViewChild('bgVideo') videoRef!: ElementRef<HTMLVideoElement>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    // 1. Verificamos se estamos no Navegador (evita erros de SSR/Hydration)
    if (isPlatformBrowser(this.platformId)) {
      this.iniciarVideo();
    }
  }

  private iniciarVideo() {
    // 2. Verificação de segurança: o elemento existe?
    if (this.videoRef && this.videoRef.nativeElement) {
      const video = this.videoRef.nativeElement;

      // 3. O erro "is not a function" acontece se 'video' não for um HTMLVideoElement
      // Vamos garantir que ele entenda o tipo antes de chamar o play
      if (typeof video.play === 'function') {
        video.currentTime = 1;
        
        video.play().catch(err => {
          console.warn("Autoplay bloqueado pelo browser. O usuário precisa interagir com a página primeiro.", err);
        });

        video.onended = () => video.pause();
      } else {
        console.error("O elemento #bgVideo não é um elemento de vídeo válido.");
      }
    }
  }
}