import { Component, ElementRef, ViewChild, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {

  @ViewChild('bgVideo') videoRef!: ElementRef<HTMLVideoElement>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
  
    if (isPlatformBrowser(this.platformId)) {
      this.iniciarVideo();
    }
  }

  private iniciarVideo() {

    if (this.videoRef && this.videoRef.nativeElement) {
      const video = this.videoRef.nativeElement;

      if (typeof video.play === 'function') {
        video.muted = true;
        video.defaultMuted = true;
        video.playsInline = true;
        
        video.play().catch(err => {
          console.warn("Autoplay bloqueado pelo browser. O usuário precisa interagir com a página primeiro.", err);
        });

      } else {
        console.error("O elemento #bgVideo não é um elemento de vídeo válido.");
      }
    }
  }
}