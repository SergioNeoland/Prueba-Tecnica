import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { WeatherService } from '../weather.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-citysearch',
  templateUrl: './citysearch.component.html',
  styleUrls: ['./citysearch.component.css']
})
export class CitysearchComponent implements OnInit {
/* Primero creo un FormControl básico con un validador.  */
  search = new FormControl('', [Validators.minLength(2)]);


  constructor(private weatherService: WeatherService) {}

/* Me subscribo a todos los cambios que recibe ese formcontrol y para no hacer peticiones de más con cada cambio de tecla, le añado un retraso de un segundo.

 Si el formControl es valida y no está vacío, guardo en un array los strings dividiéndolos por la coma y eliminando los espacios

 Llamo al servicio y cojo el primer elemento y con un ternario le pasamos o no el segundo elemento

 Me subscribo al servicio del tiempo y publico los datos que recibo en el current weather que es un behaviourSubject

 Guardo en localStorage la última ciudad buscada (para que cuando arranque la aplicación nos salga con la última consulta

 Y el objeto que recibo lo paso a json con stringify*/

  ngOnInit() {
    this.search.valueChanges
      .pipe(debounceTime(1000))
      .subscribe((searchValue: string) => {
        if (!this.search.invalid && this.search.value !== '') {
          const userInput = searchValue.split(',').map(s => s.trim());

          this.weatherService
            .getCurrentWeather(
              userInput[0],
              userInput.length > 1 ? userInput[1] : undefined
            )
            .subscribe(data => {
              console.log(data);
              this.weatherService.currentWeather.next(data);
              localStorage.setItem(
                'weather',
                JSON.stringify({
                  name: data['city'].name,
                  country: data['city'].country
                })
              );
            });
        }
      });
  }


/* Simple función para recoger posible error a través de un ternario */
  getErrorMessage() {
    return this.search.hasError('minlength')
      ? 'Type more than one character to search'
      : '';
  }
}
