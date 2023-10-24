export function fetchWeather() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      
      const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m&current&weathercode`);
      const data = await response.json();
      console.log('raw data: ', data);
      // Get current hour.
      const currentHour = new Date().getHours();
      const temperature = Math.round(data.hourly.temperature_2m[currentHour]);
      console.log('temperature: ', temperature);
      // const weatherDescription = data.current_weather.weathercode;

      // Update header with weather information.
      document.querySelector('#weather-info').innerText = `${temperature}°C`;
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}
// https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m