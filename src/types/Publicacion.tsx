// types.ts

export interface PublicacionBase {
    marca: string;
    modelo: string;
    precio: number;
    descripcion: string;
    lat: number;
    lon: number;
    fotoUrl?: string;
  }
  
  export interface Publicacion extends PublicacionBase {
    id: string;
  }
  
  // Alias si querés mantener compatibilidad con el nombre anterior
  export type Phone = Publicacion;
  