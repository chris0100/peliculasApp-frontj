import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PeliculasService} from '../../services/peliculas.service';
import {MovieDetails} from '../../interfaces/movie-details';
import {Location} from '@angular/common';
import {Cast} from '../../interfaces/credits-response';
import {combineLatest} from 'rxjs';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  public pelicula: MovieDetails;
  public cast: Cast[] = [];


  constructor(private activatedRoute: ActivatedRoute, private peliculasService: PeliculasService,
              private location: Location, private router: Router) { }


  ngOnInit(): void {
    // aplicamos destructuracion para obtener el id
    const {id} = this.activatedRoute.snapshot.params;


    // para combinar los dos llamados a la API
    combineLatest([

      // hace un llamado al servicio para obtener el detalle y otro para el cast de la pelicula
      this.peliculasService.getPeliculaDetalle(id),
      this.peliculasService.getCast(id)

    ]).subscribe(([pelicula, cast]) => {

      // ESTE ES PARA PELICULA
      // Si no se obtiene nada, se redirecciona al home
      if (!pelicula){
        this.router.navigateByUrl('/home');
        return;
      }
      this.pelicula = pelicula;

      // AHORA PARA EL CAST
      // se aplica un filtro para no obtener todos los datos del cast, sino solo los que tiene img
      this.cast = cast.filter(actor => actor.profile_path !== null);
    });
  }


  // regresa a la ultima pagina que se accedio
  onRegresar(): void{
    this.location.back();
  }

}
