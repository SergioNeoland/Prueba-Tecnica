import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css']
})
export class CurrentWeatherComponent implements OnInit {
  current: any;
  formatTemp: any;
  showIcon: boolean;

  constructor(private weatherService: WeatherService) {
/* Inicializo formatTemp y le asigno la función que quiero emplear del servicio*/
    this.formatTemp = weatherService.formatTemp();
    this.showIcon = true;
  }

  ngOnInit() {
/* Me subscribo a todos los cambios que puedan ocurrir en el currentWeather que es un behaviourSubject*/
    this.weatherService.currentWeather.subscribe(data => {
      this.current = data;
/* Le quito la clase Icon y se la vuelvo a poner para que haga la animación cada vez que haya cambios (es decir, una nueva consulta)*/
      this.showIcon = false;
      setTimeout(()=>{
        this.showIcon = true
      }, 10)
    });
  }

  linkIcon() {
    return `http://openweathermap.org/img/w/${
      this.current.list[0].weather[0].icon
    }.png`;
  }


  parseHpaToMmhg(pressure: number) {
    return Math.round(pressure * 0.75006157584566);
  }

  parseWind(deg: number) {
    if (deg >= 348.76 && deg <= 11.25) {
      return 'N';
    }
    if (deg >= 11.26 && deg <= 33.75) {
      return 'NNE';
    }
    if (deg >= 33.76 && deg <= 56.25) {
      return 'NE';
    }
    if (deg >= 56.26 && deg <= 78.75) {
      return 'ENE';
    }
    if (deg >= 78.76 && deg <= 101.25) {
      return 'E';
    }
    if (deg >= 101.26 && deg <= 123.75) {
      return 'ESE';
    }
    if (deg >= 123.76 && deg <= 146.25) {
      return 'SE';
    }
    if (deg >= 146.26 && deg <= 168.75) {
      return 'SSE';
    }
    if (deg >= 168.76 && deg <= 191.25) {
      return 'S';
    }
    if (deg >= 191.26 && deg <= 213.75) {
      return 'SSW';
    }
    if (deg >= 213.76 && deg <= 236.25) {
      return 'SW';
    }
    if (deg >= 236.26 && deg <= 258.75) {
      return 'WSW';
    }
    if (deg >= 258.76 && deg <= 281.25) {
      return 'W';
    }
    if (deg >= 281.26 && deg <= 303.75) {
      return 'WNW';
    }
    if (deg >= 303.76 && deg <= 326.25) {
      return 'NW';
    }
    if (deg >= 326.26 && deg <= 348.75) {
      return 'NNW';
    }
  }
}
