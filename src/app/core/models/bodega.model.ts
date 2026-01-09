// =========================
// 📦 Bodega
// =========================
export interface Bodega {
  id:number;
  // ===== Datos generales =====
  Nombre: string;
  TipoInmueble: number;      // 1=Terreno, 2=Bodega, 3=Nave industrial
  idOperacion: number;       // 1=Renta, 2=Venta, 3=Ambas
  Precio: number | null;
  Costo_Mantenimiento: number | null;
  Uso_Suelo: number;         // 1..5
  Estado_Fisico: number | null;
  Descripcion: string;

  // ===== Dimensiones =====
  M2_Terreno: number;
  M2_Construccion: number;
  Frente: number;
  Fondo: number;
  Altura_Min: number;
  Altura_Max: number;
  Niveles: number;

  // ===== Infraestructura =====
  Cajones_Estacionamiento: number;
  Andenes: number;
  Cortinas: number;
  Rampas: number;
  Capacidad_Transformador: number;
  Resistencia: number;

  // ===== Servicios (1 / 0) =====
  Agua: number;
  Luz: number;
  Gas: number;
  Internet: number;
  Alarma: number;
  Cisterna: number;
  Iluminacion: number;
  Extractores: number;
  Caseta_Vigilancia: number;
  Acceso_Plano: number;
  Acceso_Rampa: number;

  // ===== Dirección =====
  Direccion: Direccion;
}

// =========================
// 📍 Dirección
// =========================
export interface Direccion {
  c_CodigoPostal: string;
  Estado: string;
  Municipio: string;
  Colonia: string;
  Calle: string;
  NoExterior: string;
  NoInterior: string;
  Referencia: string;
}
