import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  backgroundStyle: string = "url('assets/images/default.jpg') no-repeat center center / cover";
  weatherData: any;
  userLocationWeather: any;

  constructor(private weatherService: WeatherService) {}

  getWeather(city: string) {
    this.weatherService.getWeather(city).subscribe((data) => {
      this.weatherData = data;
      const condition = data.weather[0].main;
      this.updateBackground(condition);
    });
  }

  updateBackground(weatherCondition: string) {
    switch (weatherCondition) {
      case 'Clear':
        this.backgroundStyle = "url('https://www.shutterstock.com/image-photo/clear-blue-sky-few-clouds-600nw-2488278533.jpg') no-repeat center center / cover";
        break;
      case 'Clouds':
        this.backgroundStyle = "url('https://img.freepik.com/free-photo/cloudy-stormy-black-white-dramatic-sky_146671-19382.jpg') no-repeat center center / cover";
        break;
      case 'Rain':
        this.backgroundStyle = "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBENBn8XvGfWr_3n9FM1lANlDL9lW95cV7k5brDfnkR3wcKta_fRIJkkZ1o1S2ay7u_EQ&usqp=CAU') no-repeat center center / cover";
        break;
      case 'Snow':
        this.backgroundStyle = "url('https://as1.ftcdn.net/jpg/02/97/11/90/1000_F_297119074_51DF5GM4l7P0nXWointNPYqFI4FImVXi.jpg') no-repeat center center / cover";
        break;
      case 'Thunderstorm':
        this.backgroundStyle = "url('https://img.freepik.com/free-photo/dark-thunderstorm-danger-electricity-spooky-landscape-generative-ai_188544-8943.jpg') no-repeat center center / cover";
        break;
      case 'Mist':
      case 'Fog':
        this.backgroundStyle = "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShnM_nvKUMD0LeIYpv9zOQ8mCvdSMq4N75gA&s') no-repeat center center / cover";
        break;
      default:
        this.backgroundStyle = "url('https://e0.pxfuel.com/wallpapers/176/804/desktop-wallpaper-weather-beautiful-weather.jpg') no-repeat center center / cover";
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
