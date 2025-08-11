/**
 * MODEL – Handles fetching weather data from Open-Meteo API
 * This is where all the "data logic" lives.
 */
export default class WeatherModel {
  /**
   * Fetch weather data using Open-Meteo API
   * @param {number} lat - Latitude
   * @param {number} lon - Longitude
   */
  async fetchWeather(lat, lon) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Weather data could not be fetched");
    }
    const data = await response.json();
    return data.current_weather;
  }

  /**
   * Convert city name → coordinates using Nominatim (free geocoding API)
   * @param {string} city
   */
  async getCoordinates(city) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch coordinates");
    }
    const results = await response.json();
    if (results.length === 0) {
      throw new Error("City not found");
    }
    return {
      lat: results[0].lat,
      lon: results[0].lon
    };
  }
}
