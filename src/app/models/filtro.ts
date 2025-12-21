export interface FiltroItem {
  value: string;
}

export interface Filtro {
  Title: string;
  Tipo: 'radio' | 'checkbox';
  Items: FiltroItem[];
}
