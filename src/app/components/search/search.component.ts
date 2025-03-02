import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  weatherData: any;
  userLocationWeather: any;
  backgroundStyle: string = 'url(assets/images/default.jpg)'; // ✅ Initialize the background

  constructor(private weatherService: WeatherService) {}

  getWeather(city: string) {
    this.weatherService.getWeather(city).subscribe((data) => {
      this.weatherData = data;
      this.updateBackground(data.weather[0].main);
    });
  }

  updateBackground(weatherCondition: string) {
    switch (weatherCondition) {
      case 'Clear':
        this.backgroundStyle = "url('https://img.freepik.com/free-photo/cloud-blue-sky_1232-3108.jpg?t=st=1740898590~exp=1740902190~hmac=7219698f6b1ecce0d0b0ebd9e94a53af09591cd3d0e7b78ff3704b4bff84cb15&w=1380') no-repeat center center / cover";
        break;
      case 'Clouds':
        this.backgroundStyle = "url('https://img.freepik.com/free-photo/cloudy-stormy-black-white-dramatic-sky_146671-19382.jpg?t=st=1740898663~exp=1740902263~hmac=bca8892906164f4b6ad2a94b33cc571155cffe923c793c369cb3d906121ab02e&w=1480') no-repeat center center / cover";
      break;
        break;
      case 'Rain':
        this.backgroundStyle = "url('https://img.freepik.com/free-vector/monsoon-rainfall-with-clouds-background_1017-32365.jpg?t=st=1740898898~exp=1740902498~hmac=75c359fcbb508526d99b38989ea228294bd4a8a4f8d311d238bf099b560a9215&w=1800') no-repeat center center / cover";
        break;
      case 'Snow':
        this.backgroundStyle = "url('https://img.freepik.com/free-photo/view-snowy-mountain-fir-trees-with-blue-sky-background_9083-8044.jpg?t=st=1740898932~exp=1740902532~hmac=ea50bf414164ce7d49278fedc8dc90224740e769a94e0fa8f7a82bf657e60d18&w=1380') no-repeat center center / cover";
      break;
      case 'Thunderstorm':
        this.backgroundStyle = "url('https://img.freepik.com/free-photo/dark-thunderstorm-danger-electricity-spooky-landscape-generative-ai_188544-8943.jpg?t=st=1740898961~exp=1740902561~hmac=78041bc5ddaa86a89f6923c9cedbc4668d63286859becbb7d41f589a114e712b&w=1800') no-repeat center center / cover";
        break;
      case 'Mist':
      case 'Fog':
        this.backgroundStyle = "url('https://img.freepik.com/free-photo/beautiful-aerial-shot-forest-enveloped-creepy-mist-fog_181624-2659.jpg?t=st=1740899049~exp=1740902649~hmac=ae32a4f9adcfedf02eed5027d3c2594e692b41f53546de9650189b1af91c1ca5&w=1380') no-repeat center center / cover";
        break;
      default:
        this.backgroundStyle = "url('https://img.freepik.com/free-vector/flat-design-monsoon-season-clouds-illustration_23-2149424294.jpg?t=st=1740899094~exp=1740902694~hmac=653fcdcf7995f4ea7d854c087222114cd1b7d782329a823612ec4681281acc8c&w=1380') no-repeat center center / cover";
    }
  }

  ngOnInit() {
    this.getUserLocation();
  }

  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        this.weatherService.getWeatherByCoords(lat, lon).subscribe((data) => {
          this.userLocationWeather = data;
          this.updateBackground(data.weather[0].main);
        });
      });
    }
  }
}
