async function getWeather() {
    const apiKey = 'cc112c1e52bbd1c2af01d0c7f9869bde';
    const cityInput = document.getElementById('cityInput').value;
    const weatherInfo = document.getElementById('weatherInfo');
    const weatherIcon = document.getElementById('weatherIcon');
    const cityCountry = document.getElementById('cityCountry');
    const temperature = document.getElementById('temperature');
    const weatherDescription = document.getElementById('weatherDescription');

    try {
        if (cityInput) {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`);
            const data = await response.json();

            if (response.ok) {
                weatherIcon.innerHTML = getWeatherIcon(data.weather[0].icon);
                cityCountry.textContent = `${data.name}, ${data.sys.country}`;
                temperature.textContent = `${data.main.temp} °C`;
                weatherDescription.textContent = data.weather[0].description;
            } else {
                throw new Error(`Error: ${data.message}`);
            }
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        weatherInfo.innerHTML = '<p>Error fetching weather data. Please try again.</p>';
    }
}

function getWeatherIcon(iconCode) {
    return `<img src="http://openweathermap.org/img/w/${iconCode}.png" alt="Weather Icon">`;
}
