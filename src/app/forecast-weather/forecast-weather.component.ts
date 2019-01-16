import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-forecast-weather',
  templateUrl: './forecast-weather.component.html',
  styleUrls: ['./forecast-weather.component.css']
})
export class ForecastWeatherComponent implements OnInit {
  forecast: any;
  dayTemp: any;

  constructor(private weatherService: WeatherService) {
    this.dayTemp = weatherService.formatTemp();
  }

  ngOnInit() {
/* Me subscribo a los cambios que haya en el currentWeather */
    this.weatherService.currentWeather.subscribe(data => {
/*  Accedo a la propiedad list de data de esta manera porque data.list da un error al no estar tipificado */
      this.forecast = data['list'] ? data['list'].slice(1) : [];
    });
  }

  linkIcon(element) {
/* En esta función recibe un parametro element (que será un objeto día) y de ahí saco el nombre del archivo para su icono*/
    return `http://openweathermap.org/img/w/${element.weather[0].icon}.png`;
  }
}
