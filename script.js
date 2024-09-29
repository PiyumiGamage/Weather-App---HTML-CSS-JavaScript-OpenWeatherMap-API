const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-deatails');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {
    const APIKey = 'f64e602ac5605bc3168b6cb25227b39a';
    const city = document.querySelector('.search-box input').value;

    if (city === '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

            if(json.cod == '404'){
                container.style.height = '400px';
                weatherBox.classList.remove('active');
                weatherDetails.classList.remove('active');
                error404.classList.add('active');
                return
            }

                container.style.height = '600px';
                weatherBox.classList.add('active');
                weatherDetails.classList.add('active');
                error404.classList.remove('active');


            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-deatails .humidity span');
            const wind = document.querySelector('.weather-deatails .wind span');


            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'https://cdn4.iconfinder.com/data/icons/the-weather-is-nice-today/64/weather_3-512.png';
                    break;
                case 'Rain':
                    image.src = 'https://cdn3.iconfinder.com/data/icons/spring-2-1/30/Rain-256.png';
                    break;
                case 'Snow':
                    image.src = 'https://cdn4.iconfinder.com/data/icons/weatherful/72/Snow_Clody-512.png';
                    break;
                case 'Clouds':
                    image.src = 'https://cdn3.iconfinder.com/data/icons/spring-2-1/30/Clouds-256.png';
                    break;
                case 'Mist':
                    image.src = 'https://cdn3.iconfinder.com/data/icons/weather-solic/24/Foggy-256.png';
                    break;
                case 'Haze':
                    image.src = 'https://cdn0.iconfinder.com/data/icons/lylac-weather/32/Mist-256.png';
                    break;
                default:
                    image.src = 'https://s-media-cache-ak0.pinimg.com/originals/00/a6/af/00a6aff7388d57eeb4b1954ccd179def.png';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C<span/>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity} %`;
            wind.innerHTML = `${parseInt(json.wind.speed)} Km/h`;


        });
            
});
