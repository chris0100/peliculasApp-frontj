import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {CarteleraResponse, Movie} from '../interfaces/cartelera-response';
import {catchError, map, tap} from 'rxjs/operators';
import {MovieDetails} from '../interfaces/movie-details';
import {Cast, CreditsResponse} from '../interfaces/credits-response';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private baseUrl = 'https://api.themoviedb.org/3';
  private carteleraPage = 1;
  public cargando = false;

  constructor(private http: HttpClient) { }

  get params(): {}{
    return {
      api_key: '4e8ec4c89b36e401aded632763d38c49',
      language: 'es-ES',
      page: this.carteleraPage.toString()
    };
  }


  // con el uso del pipe, se aumenta en 1 la pagina para la siguiente consulta
  getCartelera(): Observable<Movie[]>{
    if (this.cargando){
      // cargando peliculas
      return of([]);
    }
    console.log('llamados');
    this.cargando = true;
    return this.http.get<CarteleraResponse>(`${this.baseUrl}/movie/now_playing?`, {params: this.params})
      .pipe(
        map( (resp) => resp.results),
        tap(() => {
          this.carteleraPage += 1;
          this.cargando = false;
        })
      );
  }



  // se llama cuando se usa el input de peliculas
  buscarPeliculas(texto: string): Observable<Movie[]>{
    // le hace un destructuring para dejar page en 1.
    const params = {...this.params, page: '1', query: texto};
    return this.http.get<CarteleraResponse>(`${this.baseUrl}/search/movie`, {params})
      .pipe(
        map(resp => resp.results )
      );
  }


  // Resetear el numero de cartelera
  resetCarteleraPage(): void{
    this.carteleraPage = 1;
  }

  // obtener el detalle de la pelicula a traves del id
  getPeliculaDetalle(id: string): Observable<MovieDetails> {
    return this.http.get<MovieDetails>(`${this.baseUrl}/movie/${id}`, {params: this.params})
      .pipe(
        catchError(err => of(null))
      );
  }

  // obtener el casting de la pelicula a traves del id
  getCast(id: string): Observable<Cast[]>{
    // le hago el pipe con el map porque solo me interesa retornar el casting de la pelicula
    return this.http.get<CreditsResponse>(`${this.baseUrl}/movie/${id}/credits`, {params: this.params})
      .pipe(
        map(resp => resp.cast),
        catchError(err => of([]))
      );
  }







}
