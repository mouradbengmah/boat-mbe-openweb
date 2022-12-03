import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Boat } from '../model/Boat';

@Injectable({
  providedIn: 'root'
})
export class BoatService {

  private boatApiUrl = environment.boatApiUrl;

  constructor(private http: HttpClient) { }

  recupererLesBateaux(): Observable<Boat[]> {
    return this.http.get<Boat[]>(this.boatApiUrl + '/boat/');
  }

  recupererUnBateauParId(id: String): Observable<Boat> {
    return this.http.get<Boat>(this.boatApiUrl + '/boat/' + id);
  }

  enregistrerUnBateau(nom: string, description: string): Observable<string> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    let jsonObject = this.preparerJsonObject(nom, description);
    return this.http.post<string>(
      this.boatApiUrl + '/boat/',
      jsonObject,
      options
    );
  }

  supprimerUnBateau(id: number): Observable<Boat> {
    return this.http.delete<Boat>(this.boatApiUrl + '/boat/' + id);
  }

  private preparerJsonObject(nom: string, description: string) {
    const object = {
      nom: nom,
      description: description
    }
    return JSON.stringify(object);
  }
}
