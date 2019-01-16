import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
/* He creado una variable que se va a utilizar por defecto en caso de que en el localstorage no haya nada. Se cargará el weather de Madrid por defecto */
    let weather = { name: 'Madrid', country: 'ES' };

    if (localStorage.weather) {
      weather = JSON.parse(localStorage.getItem('weather'));
    }

    this.weatherService
      .getCurrentWeather(weather.name, weather.country)
      .subscribe(data => {
        this.weatherService.currentWeather.next(data);
      });
  }
}
