// types.ts

export interface publicacionBase {
    marca: string;
    modelo: string;
    precio: number;
    descripcion: string;
    lat: number;
    lon: number;
    fotoUrl?: string;
  }
  
  export interface publicacion extends publicacionBase {
    id: string;
  }
  
  // Alias si querés mantener compatibilidad con el nombre anterior
  export type phone = publicacion;
  