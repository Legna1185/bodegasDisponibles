// =========================
// 📦 Bodega listado (Home / Public)
// =========================
export interface BodegaListado {
  id: number;
  nombre: string;
  tipoDeinmueble: string;
  operacion: string;
  precio: string;
  estadoFisico: string;
  direccion: string;
  descripcion: string;
  Imagenes: BodegaImagen[];
}

// =========================
// 🖼️ Imagen de bodega
// =========================
export interface BodegaImagen {
  Url: string;
}
