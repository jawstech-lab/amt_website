import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../home/home.component';
import { EquipeComponent } from '../equipe/equipe.component';
import { LocalTreinoComponent } from '../local-treino/local-treino.component';
import { CalendarioComponent } from '../calendario/calendario.component';
import { ContatoComponent } from '../contato/contato.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    CommonModule,
    HomeComponent,
    EquipeComponent,
    LocalTreinoComponent,
    CalendarioComponent,
    ContatoComponent
  ],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit, OnDestroy {
  private scrollListener: (() => void) | null = null;

  ngOnInit() {
    // Touch scroll listener to enable smooth transitions
    this.scrollListener = () => {
      const sections = document.querySelectorAll('section[id]');
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.top < window.innerHeight) {
          section.classList.add('in-view');
        }
      });
    };

    window.addEventListener('scroll', this.scrollListener);
    window.addEventListener('load', () => {
      if (this.scrollListener) this.scrollListener();
    });
  }

  ngOnDestroy() {
    if (this.scrollListener) {
      window.removeEventListener('scroll', this.scrollListener);
    }
  }
}
