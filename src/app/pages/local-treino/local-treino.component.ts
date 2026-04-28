import { Component, Inject, PLATFORM_ID, NgZone } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

interface LocalTreino {
  nome: string;
  endereco: string;
  horarios: string;
  imagemUrl: string;
  linkDireto: string;
  contato?: string;
  lat: number; 
  lng: number; 
  treinador?: string;
  videoUrl?: string; // Propriedade nova para aceitar vídeos opcionais
}

@Component({
  selector: 'app-local-treino',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './local-treino.component.html',
  styleUrls: ['./local-treino.component.css']
})
export class LocalTreinoComponent {

  mostrarMapa = false;
  mapa: any;
  marcadoresMapa: any = {}; 
  localSelecionado: LocalTreino | null = null; 

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private zone: NgZone 
  ) { }

  locais: LocalTreino[] = [
  {
    nome: 'Academia Maromba (DCTA)',
    endereco: 'DCTA H8-B - São José dos Campos, SP',
    horarios: '<strong>Seg, Qua e Sex:</strong> 20h30 às 21h30',
    contato: '(12) 98845-2411',
    imagemUrl: 'imagens/Locais/ITA maroma.png',
    linkDireto: 'https://maps.app.goo.gl/ebvSbDSQzJCxSrBZ8',
    lat: -23.20267039402918, 
    lng: -45.87465798202034,
    treinador: 'Odirlei'
  },
  {
    nome: 'CT QUINTHAI',
    endereco: 'R. Cristóvão de Alençar, 20 - Vila Tesouro, São José dos Campos - SP',
    horarios: `
      <strong>Ter / Qui:</strong> 08h, 09h, 19h e 20h<br>
      <strong>Seg / Qua:</strong> 20h<br>
      <strong>Juvenil (12 a 16 anos):</strong> Ter / Qui às 17h<br>
      <strong>Intermediário / Avançado:</strong> Seg, Qua e Sex às 19h
    `,
    imagemUrl: 'imagens/Locais/QUINTHAI.png',
    linkDireto: 'https://maps.google.com/?q=Rua+Cristovao+de+Alencar+20+Vila+Tesouro+Sao+Jose+dos+Campos',
    lat: -23.172931024550035,
    lng: -45.84504900675579,
    treinador: 'Jefferson Erbas'
  },
  {
    nome: 'KM SCHOOL',
    endereco: 'Rua Icatu, 718 - Parque Industrial, São José dos Campos - SP',
    horarios: `
      <strong>Muay Thai</strong><br>
      Terça e Quinta as 19h
    `,
    contato: '(12) 98835-2826',
    imagemUrl: 'imagens/Locais/km school.png',
    linkDireto: 'https://maps.google.com/?q=Rua+Icatu+718+Parque+Industrial+Sao+Jose+dos+Campos',
    lat: -23.244681976515377, 
    lng: -45.91052097556601,
    treinador: 'Marlus Maciel'
  },
  {
    nome: 'Academia Giant Fitness',
    endereco: 'Estr. Mun. Nelson Tavares da Silva, 1310 - Bom Retiro, São José dos Campos - SP',
    horarios: '<strong>Sábados:</strong> 09h às 10h30',
    contato: '(12) 99253-1885',
    imagemUrl: 'imagens/Locais/giant fitness.png', 
    linkDireto: 'https://maps.app.goo.gl/4mYK2sWxo7W6mw168',
    lat: -23.201787965430107,
    lng: -45.777435681746304,
    treinador: 'Jéssica Telles'
  }, 
  {
    nome: 'Academia Sky Fit Leste',
    endereco: 'Rua das Peônias, 222 - São José dos Campos - SP',
    horarios: `
      <strong>Seg e Qua:</strong> 20h00 às 21h00<br>
      <strong>Ter e Qui:</strong> 09h30 às 10h30
    `,
    imagemUrl: 'imagens/Locais/skyfit.png', 
    videoUrl: 'imagens/Locais/video skyfit.mp4', 
    linkDireto: 'https://www.google.com/maps/search/?api=1&query=Rua+das+peonias,+222+sao+jose+dos+campos',
    lat: -23.17521321749508, 
    lng:  -45.827830786937724,
    treinador: 'Marlus Maciel'
  },
  {
    nome: 'CT Thai House',
    endereco: 'R. Henrique Dias, 89a - Jardim Arua, Caraguatatuba - SP',
    horarios: `
      <strong> Segundas, quartas e sextas</strong: 9:00, 14:30, 17:30, 18:30 e 19:30 </br>
      <strong> ⁠Terças e quintas </strong>: 17:30, 18:30 e 19:30 </br>
     <strong>Turma Kids</strong> Terça e quintas às 9:00
    `,
    imagemUrl: 'imagens/Locais/thai_house.jpg',     
    linkDireto: 'http://google.com/maps/place/CT+Thai+House/data=!4m2!3m1!1s0x0:0x2d4e09072b05791c?sa=X&ved=1t:2428&ictx=111',
    lat: -23.6378366, 
    lng:  -45.4293612,
    treinador: 'Rodrigo Bischoff'
  }
];

  abrirMapa() {
    this.mostrarMapa = true;
    this.localSelecionado = null; 
    setTimeout(() => {
      this.iniciarMapa();
    }, 100);
  }

  fecharMapa() {
    this.mostrarMapa = false;
    this.localSelecionado = null;
    if (this.mapa) {
      this.mapa.remove();
      this.mapa = undefined;
      this.marcadoresMapa = {};
    }
  }

  selecionarLocalDaLista(local: LocalTreino) {
    this.localSelecionado = local;

    if (this.mapa && this.marcadoresMapa[local.nome]) {
      this.mapa.flyTo([local.lat, local.lng], 14, { animate: true, duration: 1 });
      this.marcadoresMapa[local.nome].openPopup();
    }
  }

 async iniciarMapa() {
    if (isPlatformBrowser(this.platformId)) {
      // 1. Corrige a resolução do import dinâmico
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
          this.zone.run(() => {
            this.localSelecionado = local;
          });
        });

        this.marcadoresMapa[local.nome] = marker;
      });
      
     
      setTimeout(() => {
        this.mapa.invalidateSize();
      }, 200);
    }
  }
}