import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class RecommendationService {



  constructor(private http: HttpClient) { }

   api_key = 'fb5a1bd4e6f78e5efca4b87798062fc9';
  // api_key='MmY1N2FlM2ItYTU5NC00MjgyLTlhZGMtNDJmYjlhYWRkMmRi';

  initTracks() {
    return this.http.get('http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key='+this.api_key+'&format=json');
  }
 initArtists()
 {
   return this.http.get('http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key='+this.api_key+'&format=json');
 }

}

