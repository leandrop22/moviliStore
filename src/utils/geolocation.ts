export function getCurrentLocation(): Promise<{ lat: number; lon: number }> {
    if (typeof window === "undefined" || !navigator.geolocation) {
      return Promise.reject(new Error("La geolocalización no está disponible"));
    }
  
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          resolve({
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
          });
        },
        (err) => {
          reject(new Error("No se pudo obtener la ubicación: " + err.message));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
        }
      );
    });
  }
  