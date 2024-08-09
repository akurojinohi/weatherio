document.getElementById('city').addEventListener('change', async function () {
  const city = this.value;
  try {
      // Fetch geocoding data
      const geocodeResponse = await fetch(`/geocode?city=${city}`);
      const geocodeData = await geocodeResponse.json();
      const { latitude, longitude } = geocodeData.results[0];

      // Fetch weather data
      const weatherResponse = await fetch(`/historical-weather?latitude=${latitude}&longitude=${longitude}&start_date=2024-08-10&end_date=2024-08-16`);
      const weatherData = await weatherResponse.json();

      // Display weather data
      displayWeather(weatherData);
  } catch (error) {
      console.error('Error fetching data:', error);
  }
});

function displayWeather(data) {
  const weatherDiv = document.getElementById('weatherData');
  weatherDiv.innerHTML = ''; // Clear previous data

  data.daily.time.forEach((time, index) => {
      const weatherArticle = document.createElement('article');
      weatherArticle.innerHTML = `
          <h2>${new Date(time).toLocaleDateString()}</h2>
          <p>Max Temp: ${data.daily.temperature_2m_max[index]}°C</p>
          <p>Min Temp: ${data.daily.temperature_2m_min[index]}°C</p>
          <p>Precipitation: ${data.daily.precipitation_sum[index] || 'N/A'} mm</p>
      `;
      weatherDiv.appendChild(weatherArticle);
  });
}
