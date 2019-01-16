import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

const APPID = 'd9f2abfbec3ad3c7c4817814069c587e';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
/* Creo un nuevo objeto de tipo BehaviourSubject que me permite subscribirme a él y publicar en él (de esta forma es más sencillo pasar datos de entre componentes) */
  currentWeather = new BehaviorSubject({});

  constructor(private httpClient: HttpClient) {}

/* Creo la función para llamar a la api y le paso por parametro una search que puede ser un string (ciudad) o un number (codigo postal) y otro parametro opcional que es el código del pais (ejemplo: ES)*/
  getCurrentWeather(search: string | number, country?: string) {
/* Creo una variable donde voy formando el string con los parámetros de búsqueda */
    let uriParams = '';
    if (typeof search === 'string') {
      uriParams = `q=${search}`;
    } else {
      uriParams = `zip=${search}`;
    }

    if (country) {
      uriParams = `${uriParams},${country}`;
    }
/* Devolvemos un observable que recibo a través de la función getCurrentWeatherHelper() y le paso por parámetro el string formado con anterioridad*/
    return this.getCurrentWeatherHelper(uriParams);
  }

/* Hago la llamada a la api con los parámetros que recibo */
  private getCurrentWeatherHelper(uriParams: string) {
    return this.httpClient.get(
      `http://api.openweathermap.org/data/2.5/forecast/daily?` +
        `${uriParams}&appId=${APPID}&units=metric&cnt=8`
    );
  }

/* En esta función retorno una función para poder emplearla fuera del servicio (por ejemplo en el html) */
  formatTemp() {
    return (temp: string) => Math.round(parseFloat(temp));
  }
}
