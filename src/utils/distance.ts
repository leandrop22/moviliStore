/**
 * Calcula la distancia en kilómetros entre dos puntos geográficos.
 * Usa la fórmula del Haversine.
 */
export function getDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    if (
      [lat1, lon1, lat2, lon2].some((n) => typeof n !== "number" || isNaN(n))
    ) {
      console.warn("Coordenadas inválidas en getDistance");
      return Infinity;
    }
  
    const R = 6371; // radio de la Tierra en km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  
    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
  }
  
  function toRad(degrees: number): number {
    return (degrees * Math.PI) / 180;
  }
  