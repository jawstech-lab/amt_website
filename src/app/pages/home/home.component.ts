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

  @ViewChild('bgVideo') videoRef!: ElementRef<HTMLVideoElement>;

  readonly marqueeRepeat = Array(4).fill(null);

  readonly destaquesBase = [
    'imagens/destaques/destaque1.png',
    'imagens/destaques/destaque2.jpg',
    'imagens/destaques/destaque3.jpg',
    'imagens/seminario_sandro.jpg',
    'imagens/Lutadores/Jhonatan Openheimer.png',
    'imagens/Lutadores/Albertinho.png',
    'imagens/Lutadores/Felipe Wesley.png',
    'imagens/Lutadores/Grilo.png',
    'imagens/Lutadores/Rafaela.jpg',
    'imagens/Lutadores/Raul Soares.png',
    'imagens/Lutadores/Ricardo.jpg',
    'imagens/Lutadores/Raphael.jpg',
    'imagens/Lutadores/JP.jpeg',
  ];

  readonly destaques = [...this.destaquesBase, ...this.destaquesBase, ...this.destaquesBase];

  padNum(n: number): string {
    return String(n).padStart(2, '0');
  }

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.iniciarVideo();
    }
  }

  scrollParaSecao(secaoId: string) {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        const el = document.getElementById(secaoId);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }
  }

  private iniciarVideo() {
    if (this.videoRef?.nativeElement) {
      const video = this.videoRef.nativeElement;
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      video.play().catch(() => {});
    }
  }
}
