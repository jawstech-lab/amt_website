import { Component, Inject, PLATFORM_ID, NgZone, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

interface HorarioLinha {
  dia: string;
  horas: string;
}

interface LocalTreino {
  nome: string;
  cidade: string;
  endereco: string;
  horarios: HorarioLinha[];
  treinador?: string;
  linkDireto: string;
  lat: number;
  lng: number;
}

@Component({
  selector: 'app-local-treino',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './local-treino.component.html',
  styleUrls: ['./local-treino.component.css']
})
export class LocalTreinoComponent implements OnDestroy {
  @ViewChild('mapaDialog') mapaDialog!: ElementRef<HTMLDialogElement>;

  mostrarMapa = false;
  mapa: any;
  marcadoresMapa: any = {};
  localSelecionado: LocalTreino | null = null;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private zone: NgZone
  ) {}

  ngOnDestroy() {
    this.liberarScroll();
  }

  locais: LocalTreino[] = [
    {
      nome: 'Academia Maromba (DCTA)',
      cidade: 'São José dos Campos',
      endereco: 'DCTA H8-B — SJC',
      horarios: [
        { dia: 'SEG / QUA / SEX', horas: '20:30' }
      ],
      treinador: 'Odirlei',
      linkDireto: 'https://maps.app.goo.gl/pZf66',
      lat: -23.20267039402918,
      lng: -45.87465798202034,
    },
    {
      nome: 'CT Quinthai',
      cidade: 'São José dos Campos',
      endereco: 'R. Cristóvão de Alençar, 20 — Vila Tesouro, SJC',
      horarios: [
        { dia: 'TER / QUI', horas: '08:00 / 09:00 / 19:00 / 20:00' },
        { dia: 'SEG / QUA', horas: '20:00' },
      ],
      treinador: 'Jefferson Erbas',
      linkDireto: 'https://maps.app.goo.gl/pZf66',
      lat: -23.172931024550035,
      lng: -45.84504900675579,
    },
    {
      nome: 'KM School',
      cidade: 'São José dos Campos',
      endereco: 'Rua Icatu, 718 — Parque Industrial, SJC',
      horarios: [
        { dia: 'TER / QUI', horas: '19:00' }
      ],
      treinador: 'Marlus Maciel',
      linkDireto: 'https://maps.app.goo.gl/pZf66',
      lat: -23.244681976515377,
      lng: -45.91052097556601,
    },
    {
      nome: 'Academia Giant Fitness',
      cidade: 'São José dos Campos',
      endereco: 'Estr. Mun. Nelson Tavares, 1310 — Bom Retiro, SJC',
      horarios: [
        { dia: 'SÁB', horas: '09:00 – 10:30' }
      ],
      treinador: 'Jéssica Telles',
      linkDireto: 'https://maps.app.goo.gl/pZf66',
      lat: -23.201787965430107,
      lng: -45.777435681746304,
    },
    {
      nome: 'Academia Sky Fit Leste',
      cidade: 'São José dos Campos',
      endereco: 'Rua das Peônias, 222 — SJC',
      horarios: [
        { dia: 'SEG / QUA', horas: '20:00 – 21:00' },
        { dia: 'TER / QUI', horas: '09:30 – 10:30' },
      ],
      treinador: 'Marlus Maciel',
      linkDireto: 'https://maps.app.goo.gl/pZf66',
      lat: -23.17521321749508,
      lng: -45.827830786937724,
    },
    {
      nome: 'CT Thai House',
      cidade: 'Caraguatatuba',
      endereco: 'R. Henrique Dias, 89a — Jardim Arua, Caraguatatuba',
      horarios: [
        { dia: 'SEG / QUA / SEX', horas: '09:00 / 14:30 / 17:30 / 18:30 / 19:30' }
      ],
      treinador: 'Rodrigo Bischoff',
      linkDireto: 'https://maps.app.goo.gl/pZf66',
      lat: -23.6378366,
      lng: -45.4293612,
    }
  ];

  padNum(n: number): string {
    return String(n).padStart(2, '0');
  }

  scrollParaContato() {
    if (isPlatformBrowser(this.platformId)) {
      const el = document.getElementById('contato');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  abrirMapa() {
    this.mostrarMapa = true;
    this.localSelecionado = null;
    if (isPlatformBrowser(this.platformId) && this.mapaDialog) {
      this.mapaDialog.nativeElement.showModal();
      this.travarScroll();
    }
    setTimeout(() => { this.iniciarMapa(); }, 100);
  }

  fecharMapa() {
    if (isPlatformBrowser(this.platformId) && this.mapaDialog) {
      this.mapaDialog.nativeElement.close();
      this.liberarScroll();
    }
    this.mostrarMapa = false;
    this.localSelecionado = null;
    if (this.mapa) {
      this.mapa.remove();
      this.mapa = undefined;
      this.marcadoresMapa = {};
    }
  }

  fecharAoClicarFora(event: MouseEvent) {
    if (this.mapaDialog && event.target === this.mapaDialog.nativeElement) {
      this.fecharMapa();
    }
  }

  selecionarLocalDaLista(local: LocalTreino) {
    this.localSelecionado = local;
    if (this.mapa && this.marcadoresMapa[local.nome]) {
      this.mapa.flyTo([local.lat, local.lng], 14, { animate: true, duration: 1 });
      this.marcadoresMapa[local.nome].openPopup();
    }
  }

  private travarScroll() {
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = 'hidden';
    }
  }

  private liberarScroll() {
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = 'auto';
    }
  }

  async iniciarMapa() {
    if (isPlatformBrowser(this.platformId)) {
      const leafletModule = await import('leaflet');
      const L = leafletModule.default || leafletModule;
      const iconePino = L.icon({
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
      });

      this.mapa = L.map('mapa-cts').setView([-23.2000, -45.8800], 12);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.mapa);

      this.locais.forEach(local => {
        const marker = L.marker([local.lat, local.lng], { icon: iconePino })
          .addTo(this.mapa)
          .bindPopup(`<b>${local.nome}</b>`);
        marker.on('click', () => {
          this.zone.run(() => { this.localSelecionado = local; });
        });
        this.marcadoresMapa[local.nome] = marker;
      });
      setTimeout(() => { this.mapa.invalidateSize(); }, 200);
    }
  }
}
