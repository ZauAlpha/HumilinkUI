import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HumisRowResponse } from '../model/HumisRowResponse';
import { NewHumi } from '../model/NewHumi';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private humisSubject = new BehaviorSubject<HumisRowResponse[]>([]);
  public humis$ = this.humisSubject.asObservable();
  private apiUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) {}

  getHumis(): Observable<HumisRowResponse[]> {
    const url = `${this.apiUrl}/api/user/humis`;
    return this.http
      .get<HumisRowResponse[]>(url)
      .pipe(tap((urls) => this.humisSubject.next(urls)));
  }
  addHumi(newHumiUrl: string) {
    const url = `${this.apiUrl}/api/humi`;
    const body = { originalURL: newHumiUrl };
    this.http.post(url, body).subscribe({
      next: () => {
        // Una vez que el POST se completa, se vuelve a obtener la lista actualizada
        this.getHumis().subscribe();
      },
      error: (err) => {
        console.error('Error al agregar Humi:', err);
      },
    });
  }
  getCurrentHumis(): HumisRowResponse[] {
    return this.humisSubject.value;
  }
}
