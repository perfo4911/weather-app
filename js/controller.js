import WeatherModel from "./model.js";
import WeatherView from "./view.js";

/**
 * CONTROLLER – Links the Model and View together.
 * Handles user actions and updates the UI.
 */
class WeatherController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    // When user searches, run search handler
    this.view.bindSearch(this.handleSearch.bind(this));
  }

  async handleSearch(city) {
    if (!city) {
      this.view.displayError("Please enter a city name.");
      return;
    }

    try {
      // 1. Get coordinates from city name
      const { lat, lon } = await this.model.getCoordinates(city);

      // 2. Fetch weather using coordinates
      const weatherData = await this.model.fetchWeather(lat, lon);

      // 3. Update the UI with weather data
      this.view.displayWeather(city, weatherData);
    } catch (error) {
      this.view.displayError(error.message);
    }
  }
}

// Instantiate MVC parts
const app = new WeatherController(new WeatherModel(), new WeatherView());

