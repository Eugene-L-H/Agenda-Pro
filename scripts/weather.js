export function fetchWeather() {
  // Helper function for interpreting weather codes.
  function describeWeatherByWMOCode(wmoCode) {
    const weatherMap = {
      0: 'Clear sky',
      1: 'Mainly clear',
      2: 'Partly cloudy',
      3: 'Overcast',
      45: 'Fog',
      48: 'Depositing rime fog',
      51: 'Drizzle: Light',
      53: 'Drizzle: Moderate',
      55: 'Drizzle: Dense intensity',
      56: 'Freezing Drizzle: Light',
      57: 'Freezing Drizzle: Dense',
      61: 'Rain: Slight',
      63: 'Rain: Moderate',
      65: 'Rain: Heavy',
      66: 'Freezing Rain: Light',
      67: 'Freezing Rain: Heavy',
      71: 'Snow fall: Slight',
      73: 'Snow fall: Moderate',
      75: 'Snow fall: Heavy',
      77: 'Snow grains',
      80: 'Rain showers: Slight',
      81: 'Rain showers: Moderate',
      82: 'Rain showers: Violent',
      85: 'Snow showers: Slight',
      86: 'Snow showers: Heavy',
      95: 'Thunderstorm: Slight or moderate',
      96: 'Thunderstorm with slight hail',
      99: 'Thunderstorm with heavy hail'
    };
  
    return weatherMap[wmoCode] || 'Weather condition not available';
  }

  // Get the user's current location.
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      
      // Fetch weather data from OpenMeteo API.
      const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,weathercode`);
      const data = await response.json();

      // Get the city name from the API response.
      const locationResponse = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
      const locationData = await locationResponse.json();
    
      const location = locationData.address.city || data.address.town || data.address.village || "Unknown location";
      
      // Get current hour.
      const currentHour = new Date().getHours();
      console.log('Current hour:', currentHour);
      const temperature = Math.round(data.hourly.temperature_2m[currentHour]);
      
      // Get weather description based on weather code.
      const weatherCode = data.hourly.weathercode[currentHour];
      console.log('Weather code:', data.hourly.weathercode);
      const weatherDescription = describeWeatherByWMOCode(weatherCode);

      // Update header with weather information.
      document.querySelector('#location').innerText = location;
      document.querySelector('#temperature').innerText = `${temperature}°c`;
      document.querySelector('#weather-descripton').innerText = weatherDescription;
    }); 
  } else {
    console.log("Geolocation is not supported by this browser.");
    document.querySelector('#location').innerText = "Geolocation is required to get weather information.";
  }
}
