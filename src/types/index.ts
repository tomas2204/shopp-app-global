export interface Article {
  id: number;
  titulo: string;
  descripcion: string;
  precio: number;
  imagen: string;
  fav?: boolean;
  rating: number;
  categoria: string;
  unoptimized?: boolean;
}

export interface CartItem {
  article: Article;
  quantity: number;
}
