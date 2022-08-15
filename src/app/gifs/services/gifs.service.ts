import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'PTB5gwsk0V7e7regG7I6MJGdyFFtdiOl';
  private servicioUrl: string ='https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];

  public resultados:Gif[] = [];

  get historial(){
    return [...this._historial];
  }

  constructor (private http: HttpClient ){

    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];

    // if(localStorage.getItem('historial')){
      // this._historial = JSON.parse(localStorage.getItem('historial')!);
    // }
  }
  buscarGifs(query:string = ''){

    query = query.trim().toLowerCase();

    if(!this._historial.includes( query )){
     this._historial.unshift( query );
     this._historial = this._historial.splice( 0,10 );
     localStorage.setItem('historial', JSON.stringify(this.historial));
    }

const params = new HttpParams()
  .set('apiKey', this.apiKey)
  .set('limit', '10')
  .set('q', query);


    this.http.get<SearchGifsResponse>( `${this.servicioUrl}/search`, { params } )
      .subscribe( (resp ) =>{
        console.log(resp.data);
        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify( this.resultados ));
      });
  }
}
