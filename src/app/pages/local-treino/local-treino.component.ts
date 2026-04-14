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
      endereco: 'DCTA H8-B - São José dos Campos, SP (CEP: 12224-300)',
      horarios: '<strong>Seg, Qua e Sex:</strong> 20h30 às 21h30',
      contato: '(12) 98845-2411',
      imagemUrl: 'imagens local de treinamento/ITA maroma.png',
      linkDireto: 'https://maps.google.com/?q=DCTA+H8-B+Sao+Jose+dos+Campos',
      lat: -23.2200,
      lng: -45.8800
    },
    {
      nome: 'CT QUINTHAI',
      endereco: 'R. Cristóvão de Alençar, 20 - Vila Tesouro, São José dos Campos - SP (12221-190)',
      horarios: `
        <strong>Ter / Qui:</strong> 08h, 09h, 19h e 20h<br>
        <strong>Seg / Qua:</strong> 20h<br>
        <strong>Juvenil (12 a 16 anos):</strong> Ter / Qui às 17h<br>
        <strong>Intermediário / Avançado:</strong> Seg, Qua e Sex às 19h
      `,
      imagemUrl: 'imagens local de treinamento/QUINTHAI.png',
      linkDireto: 'https://maps.google.com/?q=Rua+Cristovao+de+Alencar+20+Vila+Tesouro+Sao+Jose+dos+Campos',
      lat: -23.1790,
      lng: -45.8500
    },
    {
      nome: 'KM SCHOOL',
      endereco: 'Rua Icatu, 718 - Parque Industrial, São José dos Campos - SP',
      horarios: `
        <strong>Modalidades:</strong><br>
        Jiu Jitsu • Muay Thai • MMA<br>
        Capoeira • Boxe • Kickboxe
      `,
      contato: '(12) 98835-2826',
      imagemUrl: 'imagens local de treinamento/km school.png',
      linkDireto: 'https://maps.google.com/?q=Rua+Icatu+718+Parque+Industrial+Sao+Jose+dos+Campos',
      lat: -23.2350,
      lng: -45.9000
    },
    {
      nome: 'Academia Giant Fitness',
      endereco: 'Estr. Mun. Nelson Tavares da Silva, 1310 - Bom Retiro, São José dos Campos - SP (CEP: 12226-206)',
      horarios: '<strong>Sábados:</strong> 09h às 10h30',
      contato: '(12) 99253-1885',
      imagemUrl: 'imagens local de treinamento/giant fitness.png', 
      linkDireto: 'https://maps.app.goo.gl/4mYK2sWxo7W6mw168',
      lat: -23.1585,
      lng: -45.8322
    },

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
      const L = await import('leaflet');

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
    }
  }
}