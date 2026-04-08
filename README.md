# Ecommerce — Prueba Técnica Frontend React

Aplicación de e-commerce con listado de productos, detalle y carrito de compras.

## Stack

- **Next.js** (App Router) — SSR / SSG
- **React 19** + **TypeScript**
- **CSS Modules** — sin librerías de componentes

## Requisitos previos

- Node.js >= 18

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

## Build de producción

```bash
npm run build
npm run start
```

## Estructura del proyecto

```
src/
  app/
    layout.tsx              # Root layout
    page.tsx                # Página "/"
    products/
      [id]/
        page.tsx            # Página "/products/:id"
  components/
    Header/                 # Barra de navegación
    ArticleCard/            # Card individual de producto
    ArticleList/            # Grid con buscador
    ArticleDetail/          # Vista de detalle
    Cart/                   # Drawer lateral del carrito
    StarRating/             # Estrellas de calificación
  context/
    CartContext.tsx          # Estado global del carrito
    FavoritesContext.tsx     # Estado global de favoritos
    Providers.tsx            # Provider de los componentes.
  data/
    articles.ts             # Mock de datos + funciones getArticles / getArticleById
  types/
    index.ts                # Interfaces Article, CartItem
```

## Deploy opcional

```bash
# Vercel
vercel deploy
```
