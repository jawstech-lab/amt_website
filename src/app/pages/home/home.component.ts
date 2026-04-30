import { Component, ElementRef, ViewChild, AfterViewInit, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('bgVideo') videoRef!: ElementRef<HTMLVideoElement>;

  imagensDestaques: string[] = [];
  currentIndex = 0;
  private timer: ReturnType<typeof setInterval> | null = null;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.http.get<string[]>('/data/destaques.json').subscribe({
      next: (imagens) => { this.imagensDestaques = imagens; },
      error: () => {
        this.imagensDestaques = [
          'imagens/destaques/destaque1.png',
          'imagens/destaques/destaque2.jpg',
          'imagens/destaques/destaque3.jpg'
        ];
      }
    });
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.iniciarVideo();
      this.iniciarCarrossel();
    }
  }

  private iniciarVideo() {
    if (this.videoRef?.nativeElement) {
      const video = this.videoRef.nativeElement;
      if (typeof video.play === 'function') {
        video.muted = true;
        video.defaultMuted = true;
        video.playsInline = true;
        video.play().catch(err => {
          console.warn('Autoplay bloqueado pelo browser.', err);
        });
      } else {
        console.error('O elemento #bgVideo não é um elemento de vídeo válido.');
      }
    }
  }

  private iniciarCarrossel() {
    this.timer = setInterval(() => this.proximo(), 5000);
  }

  private reiniciarTimer() {
    if (this.timer) clearInterval(this.timer);
    this.iniciarCarrossel();
  }

  proximo() {
    this.currentIndex = (this.currentIndex + 1) % this.imagensDestaques.length;
  }

  anterior() {
    this.currentIndex = (this.currentIndex - 1 + this.imagensDestaques.length) % this.imagensDestaques.length;
  }

  irPara(index: number) {
    this.currentIndex = index;
    this.reiniciarTimer();
  }

  getClasse(index: number): string {
    const len = this.imagensDestaques.length;
    if (index === this.currentIndex) return 'active';
    if (index === (this.currentIndex - 1 + len) % len) return 'prev';
    if (index === (this.currentIndex + 1) % len) return 'next';
    return 'hidden';
  }

  ngOnDestroy() {
    if (this.timer) clearInterval(this.timer);
  }
}
