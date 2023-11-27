function fetchWeather() {
  return new Promise((resolve, reject) => {
    if (!("geolocation" in navigator)) {
      reject("Geolocation is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(async position => {
      try {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,weathercode&forecast_days=1`
        );
        const data = await response.json();

        const locationResponse = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
        );
        const locationData = await locationResponse.json();

        const location =
          locationData.address.city ||
          data.address.town ||
          data.address.village ||
          "Unknown location";
        const currentHour = new Date().getHours();
        const temperature = Math.round(data.hourly.temperature_2m[currentHour]);
        const weatherCode = data.hourly.weathercode[currentHour];
        const weatherDescription = describeWeatherByWMOCode(weatherCode);

        const weatherObject = { location, temperature, weatherDescription };
        resolve(weatherObject);
      } catch (error) {
        reject(error);
      }
    }, reject);
  });
}

// Helper function for interpreting weather codes.
function describeWeatherByWMOCode(wmoCode) {
  const weatherMap = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Drizzle: Light",
    53: "Drizzle: Moderate",
    55: "Drizzle: Dense intensity",
    56: "Freezing Drizzle: Light",
    57: "Freezing Drizzle: Dense",
    61: "Rain: Slight",
    63: "Rain: Moderate",
    65: "Rain: Heavy",
    66: "Freezing Rain: Light",
    67: "Freezing Rain: Heavy",
    71: "Snow fall: Slight",
    73: "Snow fall: Moderate",
    75: "Snow fall: Heavy",
    77: "Snow grains",
    80: "Rain showers: Slight",
    81: "Rain showers: Moderate",
    82: "Rain showers: Violent",
    85: "Snow showers: Slight",
    86: "Snow showers: Heavy",
    95: "Thunderstorm: Slight or moderate",
    96: "Thunderstorm with slight hail",
    99: "Thunderstorm with heavy hail"
  };

  return weatherMap[wmoCode] || "Weather condition not available";
}

function displayWeather(object) {
  const { location, temperature, weatherDescription } = object;
  // Update header with weather information.
  document.querySelector("#location").innerText = location;
  document.querySelector("#temperature").innerText = `${temperature}°c,`;
  document.querySelector("#weather-description").innerText = weatherDescription;
}

/**
 * Asynchronously loads and displays the current weather information.
 *
 * This function calls `fetchWeather` to retrieve weather data based on the user's geolocation.
 * It then utilizes the `displayWeather` function to update the UI with the retrieved weather information.
 * In the event of an error (such as failure to fetch weather data or lack of geolocation support),
 * an error message is logged to the console, and a user-friendly error message is displayed in the UI.
 *
 * The `fetchWeather` function is responsible for handling the geolocation retrieval and weather API calls,
 * while `displayWeather` is responsible for updating the DOM elements with the weather information.
 * Any errors caught in the process result in an appropriate error message being displayed.
 */
export async function loadWeather() {
  try {
    const weatherObject = await fetchWeather();
    displayWeather(weatherObject);
  } catch (error) {
    console.error(error);

    // Display geolocation error where the weather info would have been.
    const weatherDescription = document.querySelector("#weather-description");
    weatherDescription.classList.add("geolocation-error");
    weatherDescription.innerText =
      "Weather information not available when geolocation is disabled.";
  }
}
