import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PeliculasService} from '../../services/peliculas.service';
import {Movie} from '../../interfaces/cartelera-response';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  public texto = '';
  public movies: Movie[] = [];

  constructor(private activatedRoute: ActivatedRoute, private peliculasService: PeliculasService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.texto = params.texto;

      // llamar el servicio
      this.peliculasService.buscarPeliculas(this.texto).subscribe(
        obj => {
          this.movies = obj;
        });
    });
  }

}
