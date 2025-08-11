/**
 * VIEW – Responsible for displaying data to the user.
 */
export default class WeatherView {
  constructor() {
    this.weatherContainer = document.getElementById("weatherContainer");
    this.form = document.getElementById("searchForm");
    this.cityInput = document.getElementById("cityInput");
  }

  // Get city name from form input
  getCityInput() {
    return this.cityInput.value.trim();
  }

  // Listen for form submission
  bindSearch(handler) {
    this.form.addEventListener("submit", event => {
      event.preventDefault();
      this.weatherContainer.innerHTML =`<img src="./images/loading.gif" al="loading-gif" />`
      handler(this.getCityInput());
    });
  }

  // Render weather data in UI
  displayWeather(city, weather) {
    this.weatherContainer.innerHTML = `
      <h2>${city}</h2>
      <p>Temperature: ${weather.temperature}°C</p>
      <p>Wind Speed: ${weather.windspeed} km/h</p>
      <p>Weather Code: ${weather.weathercode}</p>
    `;
    this.cityInput.value = "";
  }

  // Show error messages
  displayError(message) {
    this.weatherContainer.innerHTML = `<p style="color:red;">${message}</p>`;
  }
}
