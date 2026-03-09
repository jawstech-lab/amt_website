export interface Evento {
    data: Date;
    hora: string;
    local: string;
    titulo: string;
    descricao: string;
    tipo: 'Graduação' | 'Treino' | 'Seminário' | 'Curso' | 'Luta';
    imageUrl: string;
  }