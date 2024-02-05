const cityInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const temperatureContainer = document.getElementById('temperature');
const weatherDescriptionContainer = document.getElementById('weather-description');
const weatherIcon = document.getElementById('weather-icon');
const feelsLikeContainer = document.getElementById('feelsLike');
const humidityContainer = document.getElementById('humidity');
const windSpeedContainer = document.getElementById('windSpeed');

const apiKey = '72d217a137d58992bdcacab92cb8d82f';

searchButton.addEventListener('click', getWeather);

async function getWeather() {
    const city = cityInput.value;

    try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);

                if (!response.ok) {
            if (response.status === 404) {
                throw new Error(`City not found. Please enter a valid city name.`);
            } else {
                throw new Error(`Failed to fetch weather data. Status: ${response.status}`);
            }
        }

        const data = await response.json();

        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;
        const feelsLike = Math.round(data.main.feels_like - 273.15);
        const temperature = Math.round(data.main.temp - 273.15);

        weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

        temperatureContainer.textContent = `Temperature: ${temperature}°C`;
        weatherDescriptionContainer.textContent = data.weather[0].description;
        feelsLikeContainer.textContent = `Feels Like: ${feelsLike}°C`;
        humidityContainer.textContent = `Humidity: ${humidity}%`;
        windSpeedContainer.textContent = `Wind Speed: ${windSpeed} m/s`;
    } catch (error) {
        console.error('Error fetching weather data:', error.message || error);
        console.error('Error stack trace:', error.stack);
        
        alert(error.message || 'An error occurred. Please try again.');
    }
}
