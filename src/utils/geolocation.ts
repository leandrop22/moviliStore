export function getUserLocation(): Promise<{ lat: number; lon: number }> {
    return new Promise((res, rej) =>
      navigator.geolocation.getCurrentPosition(
        (pos) => res({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
        (err) => rej(err)
      )
    );
  }
  