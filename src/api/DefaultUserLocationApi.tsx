// api/locationApi.ts
// "use client"
export const fetchUserLocation = async () => {
    return new Promise<{ city: string; state: string; country: string }>((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
  
          try {
            const geocodeResponse = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            );
            const geocodeData = await geocodeResponse.json();
            const city = geocodeData.city;
            const state = geocodeData.principalSubdivision;
            const country = geocodeData.countryName;
  
            resolve({ city, state, country });
          } catch (error) {
            reject(`Error fetching location data: ${error}`);
          }
        }, (error) => {
          reject(`Geolocation error: ${error.message}`);
        });
      } else {
        reject("Geolocation is not supported by this browser.");
      }
    });
  };
  