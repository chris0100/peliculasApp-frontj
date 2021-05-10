import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {PeliculasService} from '../../services/peliculas.service';
import {Movie} from '../../interfaces/cartelera-response';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  public movies: Movie[] = [];
  public moviesSlideshow: Movie[] = [];


  // Esta atento al scroll del mouse
  @HostListener('window:scroll', ['$event'])
  onScroll(){
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + 1300; // devuelve la posicion desde arriba en num
    const max = (document.documentElement.scrollHeight || document.body.scrollHeight); // devuelve el maximo height

    // calcula en que momento se empieza a calcular la peticion http.get
    if (pos > max){
      // llama el servicio
    this.peliculasService.getCartelera().subscribe(
      movies => {
        this.movies.push(...movies);
      });
    }
  }

  constructor(private peliculasService: PeliculasService) { }

  ngOnInit(): void {

    // Obtener cartelera
    this.peliculasService.getCartelera().subscribe(
        movies => {
          this.movies = movies;
          this.moviesSlideshow = movies;
        });
  }

  // Cuando se destruya esta pagina y se pase a otra, se activa el destroy
  ngOnDestroy(): void {
    console.log('destroy activado');
    this.peliculasService.resetCarteleraPage();
  }

}
